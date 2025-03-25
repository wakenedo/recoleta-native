import React, { FC } from "react";
import { Heading } from "@/components/ui/heading";
import { View } from "react-native";
import { ScheduleHourProps } from "../types";

const ScheduleHour: FC<ScheduleHourProps> = ({
  selectedHour,
  setSelectedHour,
}) => {
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
