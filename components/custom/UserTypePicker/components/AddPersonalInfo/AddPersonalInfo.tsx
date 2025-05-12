import React from "react";
import { View, Text } from "react-native";
const AddPersonalInfo = () => {
  return (
    <View className="w-full mb-2 justify-center items-center bg-white py-6 px-4">
      <Text className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Informações Pessoais
      </Text>
      <View className="px-3">
        <Text className=" text-gray-600 ">
          Complete o seu perfil para uma melhor experiência. Isso nos ajuda a
          entender suas necessidades e oferecer um serviço mais seguro e
          transparente.
        </Text>
      </View>
    </View>
  );
};
export default AddPersonalInfo;
