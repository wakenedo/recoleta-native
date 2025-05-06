import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { WasteProducerProvider } from "@/context/WasteProducerContext";
import { ActivityIndicator, View } from "react-native";
import { User } from "./Home";
import { WasteProducerStatsInterface } from "@/components/custom/UserInterface/components/WasteProducerStatsInterface";
import { BackToHomeButton } from "@/components/custom/BackToHomeButton";

const StatScreen = () => {
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
      <BackToHomeButton user={user} />
      {user?.userType === "PRODUCES_WASTE" && (
        <WasteProducerProvider>
          <WasteProducerStatsInterface user={user} />
        </WasteProducerProvider>
      )}
    </>
  );
};
export default StatScreen;
