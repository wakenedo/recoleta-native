import { BackToHomeButton } from "@/components/custom/BackToHomeButton";
import { RegionPriceTable } from "@/components/custom/RegionPriceTable";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const RegionPriceTableScreen = () => {
  const { authState } = useAuth();
  const { loadUser, loading, user } = useUser();

  useEffect(() => {
    loadUser(); // Properly pass token to load user
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4B9CD3" />
      </View>
    );
  }

  console.log("PriceTable AuthState:", authState);
  if (!authState?.token) return;

  return (
    <>
      <BackToHomeButton user={user} />
      <RegionPriceTable
        token={authState.token}
        region="sp" // ou dinamicamente: baseado no perfil, localização etc.
      />
    </>
  );
};

export default RegionPriceTableScreen;
