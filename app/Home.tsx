import { View, Platform, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/AuthContext";
import { Button } from "react-native";
import Constants from "expo-constants";
import { UserTypePicker } from "@/components/custom/UserTypePicker";
import { UserActionsInterface } from "@/components/custom/UserActionsInterface";

const { API_URL, TOKEN_KEY } = Constants.expoConfig?.extra || {};

export interface User {
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
    <View className="flex-auto items-center justify-center m-2">
      {needsUserType ? (
        <UserTypePicker onSelect={handleUserTypeSelect} />
      ) : (
        <View className="rounded-sm items-center border-2 border-gray-300 justify-center p-4 w-full h-full">
          <Text className="text-xl font-semibold mb-2">Home</Text>
          {user && (
            <View>
              <Text className="mb-4">
                {user.firstName} {user.lastName} ({user.userType})
              </Text>
              <UserActionsInterface user={user} />
            </View>
          )}
          <View className="mt-4">
            <Button title="Logout" onPress={onLogout} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;
