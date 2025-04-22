import { View, Platform, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/context/AuthContext";
import Constants from "expo-constants";
import { UserTypePicker } from "@/components/custom/UserTypePicker";
import { UserInterface } from "@/components/custom/UserInterface";

const { API_URL, TOKEN_KEY } = Constants.expoConfig?.extra || {};

export interface User {
  email?: string;
  photo?: string;
  firstName: string;
  lastName: string;
  userType: string;
}

const Home = () => {
  const { onLogout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredentials = async () => {
      const storedToken =
        Platform.OS === "web"
          ? await AsyncStorage.getItem(TOKEN_KEY)
          : await SecureStore.getItemAsync(TOKEN_KEY);

      setToken(storedToken);
    };

    fetchCredentials();
  }, []);

  useEffect(() => {
    const LoadUser = async () => {
      if (!token) return;

      try {
        const result = await axios.get(`${API_URL}/user`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        console.log("🧾 Raw response from /user:", result.data);

        setUser(result.data);
      } catch (e: any) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    };

    LoadUser();
  }, [token]);

  const handleUserTypeSelect = async (
    selectedType: "COLLECTS_WASTE" | "PRODUCES_WASTE"
  ) => {
    if (!token) {
      console.warn("No token found");
      return;
    }

    console.log("Sending user type selection to backend:", selectedType);

    try {
      const response = await axios.put(
        `${API_URL}/set-user-type`,
        { userType: selectedType },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User type successfully updated:", response.data);

      setUser(response.data); // now includes updated userType + needsUserType: false
    } catch (error: any) {
      console.error(
        "Erro ao atualizar o tipo de usuário:",
        error.response?.data || error.message
      );
      alert("Erro ao atualizar o tipo de usuário");
    }
  };
  const needsUserType =
    user &&
    !["COLLECTS_WASTE", "PRODUCES_WASTE", "admin"].includes(user.userType);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4B9CD3" />
      </View>
    );
  }

  return (
    <View className="flex-auto items-center justify-center mx-2">
      {needsUserType ? (
        <UserTypePicker onSelect={handleUserTypeSelect} />
      ) : (
        <View className="rounded-sm items-center justify-center p-4 w-full h-full">
          {user && <UserInterface user={user} onLogout={onLogout} />}
        </View>
      )}
    </View>
  );
};

export default Home;
