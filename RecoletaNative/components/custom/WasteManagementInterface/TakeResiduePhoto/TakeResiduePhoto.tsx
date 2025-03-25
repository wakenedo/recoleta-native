import { Heading } from "@/components/ui/heading";
import React, { FC } from "react";
import { View } from "react-native";
import { TakeResiduePhotoProps } from "../types";

const TakeResiduePhoto: FC<TakeResiduePhotoProps> = ({ photo, setPhoto }) => {
  return (
    <View>
      <Heading size="xs">Adicione Foto do Resido</Heading>
      {/*
          Aqui vai o componente de relógio para o usuário escolher um horário.
          */}
    </View>
  );
};
export default TakeResiduePhoto;
