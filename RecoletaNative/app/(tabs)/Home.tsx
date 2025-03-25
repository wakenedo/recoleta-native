import { View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Text } from "@/components/ui/text";
import { WasteManagementInterface } from "@/components/custom/WasteManagementInterface";
import { FlowProvider } from "../context/FlowContext";

const TOKEN_KEY = "user-jwt";
const API_URL = "https://recoletaapi.onrender.com/api";

const Home = () => {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    userType: string;
  } | null>(null);
  const [token, setToken] = useState<string | null>(null);

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
      if (!token) return; // Aguarda os valores serem carregados

      try {
        const result = await axios.get(`${API_URL}/user`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUser(result.data);
      } catch (e: any) {
        alert(e.message);
      }
    };

    LoadUser();
  }, [token]);

  return (
    <>
      <View>
        <Text>Home</Text>
        {user && (
          <Text>{`${user.firstName} ${user.lastName} ${user.userType}`}</Text>
        )}
      </View>
      <FlowProvider>
        <WasteManagementInterface />
      </FlowProvider>
    </>
  );
};

export default Home;
