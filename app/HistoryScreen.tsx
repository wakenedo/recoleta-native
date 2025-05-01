import { WasteProducerProvider } from "@/context/WasteProducerContext";
import { useRouter } from "expo-router";
import React from "react";
import { Button } from "react-native";

const HistoryScreen = () => {
  const router = useRouter();
  return (
    <WasteProducerProvider>
      <Button
        title="Voltar"
        onPress={() => {
          router.back();
        }}
      />
    </WasteProducerProvider>
  );
};
export default HistoryScreen;
