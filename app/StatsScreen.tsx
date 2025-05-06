import { useAuth } from "@/context/AuthContext";
import { WasteProducerProvider } from "@/context/WasteProducerContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { User } from "./Home";
import { WasteProducerStatsInterface } from "@/components/custom/UserInterface/components/WasteProducerStatsInterface";

const StatScreen = () => {
  const router = useRouter();
  const { loadUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user && loadUser) {
      loadUser(setUser, setLoading); // Properly pass token to load user
    }
  }, [user, loadUser]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4B9CD3" />
      </View>
    );
  }

  return (
    <>
      <Button
        title="Voltar"
        onPress={() => {
          router.back();
        }}
      />
      {user?.userType === "PRODUCES_WASTE" && (
        <WasteProducerProvider>
          <WasteProducerStatsInterface />
        </WasteProducerProvider>
      )}
    </>
  );
};
export default StatScreen;
