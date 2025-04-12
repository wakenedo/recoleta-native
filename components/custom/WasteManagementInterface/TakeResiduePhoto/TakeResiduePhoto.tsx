import { Heading } from "@/components/ui/heading";
import React from "react";
import { Platform, View } from "react-native";

const TakeResiduePhoto = () => {
  return (
    <View className={`${Platform.OS != "windows" ? "mt-6" : ""}`}>
      <Heading size="xs">Adicione Foto do Resido</Heading>
      {/*
          Aqui vai o componente de relógio para o usuário escolher um horário.
          */}
    </View>
  );
};
export default TakeResiduePhoto;
