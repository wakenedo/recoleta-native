import React, { useEffect } from "react";
import { CalendarInterface } from "@/components/custom/UserInterface/components/CalendarInterface";
import { WasteProducerProvider } from "@/context/WasteProducerContext";
import { ActivityIndicator, View } from "react-native";
import { BackToHomeButton } from "@/components/custom/BackToHomeButton";
import { useUser } from "@/context/UserContext";

const CalendarScreen = () => {
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

  return (
    <>
      <BackToHomeButton user={user} />
      {user?.userType === "PRODUCES_WASTE" && (
        <WasteProducerProvider>
          <CalendarInterface user={user} />
        </WasteProducerProvider>
      )}
    </>
  );
};
export default CalendarScreen;
