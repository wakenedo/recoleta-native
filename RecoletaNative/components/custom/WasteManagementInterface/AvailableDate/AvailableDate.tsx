import React, { FC } from "react";
import { Heading } from "@/components/ui/heading";
import { AvailableDateProps } from "../types";
import { Platform, View } from "react-native";


const AvailableDate: FC<AvailableDateProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <View className={`${Platform.OS != "windows" ? "mt-6" : ""}`}>
      <Heading size="xs">Data Preferida para Coleta</Heading>
      {/*
          Aqui vai o componente de calendário para o usuário escolher uma data.
          */}
    </View>
  );
};

export default AvailableDate;
