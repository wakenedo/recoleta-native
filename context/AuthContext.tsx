import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userType: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

const { API_URL, TOKEN_KEY, WEB_CLIENT_ID, LOCAL_API_URL } =
  Constants.expoConfig?.extra || {};

export const AuthProvider = ({ children }: any) => {
  //handling state
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    needsUserType?: boolean;
  }>({
    //inicial case
    token: null,
    authenticated: null,
  });

  //loading data
  useEffect(() => {
    const loadToken = async () => {
      try {
        let token;
        if (Platform.OS === "web") {
          token = await AsyncStorage.getItem("user-jwt");
        } else {
          token = await SecureStore.getItemAsync("user-jwt");
        }

        if (token) {
          axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

          setAuthState({
            token: token,
            authenticated: true,
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig?.extra?.WEB_CLIENT_ID,
      offlineAccess: true, // Optional but good to keep
      forceCodeForRefreshToken: false,
    });
  }, []);

  //login
  const login = async (email: string, password: string) => {
    console.log(TOKEN_KEY);
    try {
      const result = await axios.post(`${LOCAL_API_URL}/auth/login`, {
        email,
        password,
      });

      console.log(result.data);

      setAuthState({
        token: result.data.accessToken,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${result.data.accessToken}`;

      if (Platform.OS === "web") {
        await AsyncStorage.setItem(TOKEN_KEY, result.data.accessToken);
      } else {
        await SecureStore.setItemAsync(TOKEN_KEY, result.data.accessToken);
      }

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  //register
  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userType: string
  ) => {
    try {
      return await axios.post(`${LOCAL_API_URL}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
        userType,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  //logout
  const logout = async () => {
    try {
      //delete token from storage
      if (Platform.OS === "web") {
        await AsyncStorage.removeItem(TOKEN_KEY);
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }

      //update Headers
      axios.defaults.headers.common["authorization"] = "";

      //reset auth state
      setAuthState({
        token: null,
        authenticated: false,
      });
      console.log(authState);
    } catch (e) {
      console.error(e);
    }
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;

      if (!idToken) throw new Error("Missing Google ID token");

      const response = await axios.post(`${LOCAL_API_URL}/auth/google-login`, {
        idToken,
      });

      const { accessToken, needsUserType } = response.data;

      setAuthState({
        token: accessToken,
        authenticated: true,
        needsUserType,
      });

      axios.defaults.headers.common["authorization"] = `Bearer ${accessToken}`;

      if (Platform.OS === "web") {
        await AsyncStorage.setItem(TOKEN_KEY, accessToken);
      } else {
        await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
      }

      return response;
    } catch (error) {
      console.error("Google login error:", error.message);
      return { error: true, msg: "Google sign-in failed." };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onGoogleLogin: googleLogin,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
