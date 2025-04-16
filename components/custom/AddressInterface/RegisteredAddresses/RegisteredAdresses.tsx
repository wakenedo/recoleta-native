import React from "react";
import { View, Text } from "react-native";
const RegisteredAddresses = () => {
  return (
    <View className=" h-full p-4 ">
      <Text className="text-lg font-bold mb-2">Endereços Cadastrados</Text>
      <Text className="text-sm text-gray-600">
        Aqui estão os endereços que você cadastrou.
      </Text>
      {/* Aqui você pode adicionar a lógica para listar os endereços cadastrados */}
      {/* e permitir que o usuário selecione um deles */}
    </View>
  );
};
export default RegisteredAddresses;
