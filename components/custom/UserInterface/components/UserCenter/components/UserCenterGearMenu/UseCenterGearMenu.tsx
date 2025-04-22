import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface UserCenterGearMenuProps {
  onLogout?: () => Promise<any>;
  setShowActions: (show: boolean) => void;
}

const UseCenterGearMenu: FC<UserCenterGearMenuProps> = ({
  onLogout,
  setShowActions,
}) => {
  return (
    <View className="absolute top-10 right-4 bg-white p-2 rounded shadow z-10">
      <TouchableOpacity
        className="py-1"
        onPress={() => {
          console.log("Edit Profile");
          setShowActions(false);
        }}
      >
        <Text>Meu Perfil</Text>
        <TouchableOpacity
          className="py-1"
          onPress={() => {
            console.log("Edit Profile");
            setShowActions(false);
          }}
        >
          <Text>Estatísticas da Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-1"
          onPress={() => {
            console.log("Edit Profile");
            setShowActions(false);
          }}
        >
          <Text>Histórico de Coletas</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        className="py-1"
        onPress={() => {
          setShowActions(false);
          onLogout?.();
        }}
      >
        <Text className="text-red-500">Sair</Text>
      </TouchableOpacity>
    </View>
  );
};
export default UseCenterGearMenu;
