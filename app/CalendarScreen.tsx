import { CalendarInterface } from "@/components/custom/UserInterface/components/CalendarInterface";
import { WasteProducerProvider } from "@/context/WasteProducerContext";
import { useRouter } from "expo-router";
import React from "react";
import { Button } from "react-native";

const CalendarScreen = () => {
  const router = useRouter();
  return (
    <WasteProducerProvider>
      <Button
        title="Voltar"
        onPress={() => {
          router.back();
        }}
      />
      <CalendarInterface />
    </WasteProducerProvider>
  );
};
export default CalendarScreen;
