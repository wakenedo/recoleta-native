import React, { FC } from "react";
import { Heading } from "@/components/ui/heading";
import { View } from "react-native";
import { AvailableDateProps } from "../types";

const AvailableDate: FC<AvailableDateProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <View>
      <Heading size="xs">Data Preferida para Coleta</Heading>
      {/*
          Aqui vai o componente de calendário para o usuário escolher uma data.
          */}
    </View>
  );
};

export default AvailableDate;
