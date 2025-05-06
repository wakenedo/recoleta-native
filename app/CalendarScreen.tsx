import { CalendarInterface } from "@/components/custom/UserInterface/components/CalendarInterface";
import { useAuth } from "@/context/AuthContext";
import { WasteProducerProvider } from "@/context/WasteProducerContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, View } from "react-native";
import { User } from "./Home";

const CalendarScreen = () => {
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
          <CalendarInterface />
        </WasteProducerProvider>
      )}
    </>
  );
};
export default CalendarScreen;
