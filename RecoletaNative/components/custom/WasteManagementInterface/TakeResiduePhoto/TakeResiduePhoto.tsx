import { Heading } from "@/components/ui/heading";
import React, { FC } from "react";
import { TakeResiduePhotoProps } from "../types";
import { Platform, View } from "react-native";

const TakeResiduePhoto: FC<TakeResiduePhotoProps> = ({ photo, setPhoto }) => {
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
