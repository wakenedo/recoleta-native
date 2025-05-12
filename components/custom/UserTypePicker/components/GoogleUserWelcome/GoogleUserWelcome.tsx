import React from "react";
import { View, Text } from "react-native";

const GoogleUserWelcome = () => {
  return (
    <View className="w-full mb-2 justify-center items-center bg-white py-6 px-4">
      <Text className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Olá, usuário do Google!
      </Text>
      <View className="px-3">
        <Text className=" text-gray-600 ">
          Você está prestes a se conectar à nossa plataforma. Usuários do Google
          são considerados verificados.
        </Text>
      </View>
    </View>
  );
};
export default GoogleUserWelcome;
