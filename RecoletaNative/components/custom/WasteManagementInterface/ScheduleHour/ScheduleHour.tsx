import React from "react";
import { Heading } from "@/components/ui/heading";
import { Platform, View } from "react-native";

const ScheduleHour = () => {
  return (
    <View className={`${Platform.OS != "windows" ? "mt-6" : ""}`}>
      <Heading size="xs">Hora Preferida para Coleta</Heading>
      {/*
          Aqui vai o componente de relógio para o usuário escolher um horário.
          */}
    </View>
  );
};
export default ScheduleHour;
