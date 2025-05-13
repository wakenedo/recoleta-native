import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface UserTypePickerProps {
  handleSelect: (userType: "COLLECTS_WASTE" | "PRODUCES_WASTE") => void;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const UserTypePickerInterface: FC<UserTypePickerProps> = ({ handleSelect }) => {
  return (
    <View className="p-6 bg-white rounded shadow-lg w-full">
      <Text className="text-lg font-semibold mb-6 text-slate-800 uppercase">
        tipo de usuário
      </Text>

      <TouchableOpacity
        onPress={() => handleSelect("COLLECTS_WASTE")}
        className="items-center bg-green-100 p-4 rounded-2xl mb-4 shadow-md"
      >
        <Text className="text-green-800 text-center font-semibold text-lg">
          Coletor de Resíduos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleSelect("PRODUCES_WASTE")}
        className="items-center bg-orange-100 p-4 rounded-2xl shadow-md"
      >
        <Text className="text-orange-800 text-center font-semibold text-lg">
          Produtor de Resíduos
        </Text>
      </TouchableOpacity>

      <View className="mt-6">
        <Text className=" text-slate-600 text-center text-xs">
          * É necessário apenas selecionar o seu tipo de usuário e
          posteriormente adicionar informações pessoais, como telefone e
          CPF/CNPJ.
        </Text>
      </View>
    </View>
  );
};
export default UserTypePickerInterface;
