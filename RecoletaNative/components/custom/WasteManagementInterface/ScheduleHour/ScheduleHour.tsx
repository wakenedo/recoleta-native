import React from "react";
import { Heading } from "@/components/ui/heading";
import { View } from "react-native";

const ScheduleHour = () => {
  return (
    <View>
      <Heading size="xs">Hora Preferida para Coleta</Heading>
      {/*
          Aqui vai o componente de relógio para o usuário escolher um horário.
          */}
    </View>
  );
};
export default ScheduleHour;
