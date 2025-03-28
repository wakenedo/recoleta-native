import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { jwtDecode } from "jwt-decode";
import * as AuthSession from "expo-auth-session";

const webClientId =
  "560029034956-rhqjiqk8clkg3nhh33au5oob7q0f9dqf.apps.googleusercontent.com";
const androidClientId = "560029034956-hof5lnogt5l62um533c6s2h95agi02kq.apps.googleusercontent.com";
const iosClientId = "560029034956-chk119o9ht44stb8dvnqd2ubs32sqlf3.apps.googleusercontent.com";

WebBrowser.maybeCompleteAuthSession();

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
  onGoogleLogin?: () => void;
}

const TOKEN_KEY = "user-jwt";
const API_URL = "https://recoletaapi.onrender.com/api";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  //handling state
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    //inicial case
    token: null,
    authenticated: null,
  });

  const redirectUri = AuthSession.makeRedirectUri({
    //native: 'com.mayrom.RecoletaNative:/oauth2redirect'
    //path: "oauth2redirect",
    useProxy: true,
  });
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId,
    androidClientId,
    iosClientId,
    scopes: ["profile", "email"],
    responseType: "id_token",
    redirectUri,
  });

  //loading data
  useEffect(() => {
    const loadToken = async () => {
      try {
        let token;
        if (Platform.OS === "web") {
          token = await AsyncStorage.getItem(TOKEN_KEY);
        } else {
          token = await SecureStore.getItemAsync(TOKEN_KEY);
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
    const handleGoogleResponse = async () => {
      if (response?.type === "success") {
        try {
          const googleToken = response?.params?.id_token;
          if (!googleToken) throw new Error("ID Token não encontrado");

          // Decodifica o ID Token para obter os dados do usuário
          const userInfo: any = jwtDecode(googleToken);

          // Extrai os dados corretamente
          const firstName = userInfo.given_name || "";
          const lastName = userInfo.family_name || "";
          const email = userInfo.email || "";
          const profilePicture = userInfo.picture || "";

          console.log("Usuário autenticado:", userInfo);

          // Defina uma senha padrão para usuários do Google (ou peça para o backend gerar)
          const password = "google_oauth_password";

          try {
            // Tenta fazer login
            const loginResponse = await axios.post(`${API_URL}/auth/login`, {
              email,
              password,
            });

            if (loginResponse.data.accessToken) {
              await storeAuthToken(loginResponse.data.accessToken);
            }
          } catch (error) {
            if ((error as any)?.response?.status === 401) {
              // Se o login falhar, significa que o usuário ainda não está registrado. Então registramos.
              try {
                await axios.post(`${API_URL}/auth/register`, {
                  firstName,
                  lastName,
                  email,
                  password,
                  userType: "user", // Defina o userType conforme necessário
                });

                // Após o registro, tentamos o login novamente
                const loginResponse = await axios.post(
                  `${API_URL}/auth/login`,
                  { email, password }
                );

                if (loginResponse.data.accessToken) {
                  await storeAuthToken(loginResponse.data.accessToken);
                }
              } catch (error) {
                console.error("Erro ao registrar ou logar com Google:", error);
              }
            }
          }
        } catch (error) {
          console.error("Erro ao processar o ID Token:", error);
        }
      }
    };

    handleGoogleResponse();
  }, [response]);

  const storeAuthToken = async (token: string) => {
    setAuthState({ token, authenticated: true });
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

    if (Platform.OS === "web") {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } else {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
  };

  //login
  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      await storeAuthToken(result.data.accessToken);
      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const googleLogin = () => {
    promptAsync();
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
      return await axios.post(`${API_URL}/auth/register`, {
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
    } catch (e) {
      console.error(e);
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
