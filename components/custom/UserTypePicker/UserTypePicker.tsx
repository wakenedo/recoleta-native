// components/UserTypePicker.tsx
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";

type Props = {
  onSelect: (userType: "COLLECTS_WASTE" | "PRODUCES_WASTE") => void;
};

const UserTypePicker = ({ onSelect }: Props) => {
  return (
    <View className="p-4">
      <Text className="text-xl font-semibold mb-4">
        Selecione o tipo de usuário:
      </Text>

      <TouchableOpacity
        onPress={() => onSelect("COLLECTS_WASTE")}
        className="bg-green-600 p-4 rounded-2xl mb-2"
      >
        <Text className="text-white text-center font-medium">
          Coletor de Resíduos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onSelect("PRODUCES_WASTE")}
        className="bg-blue-600 p-4 rounded-2xl"
      >
        <Text className="text-white text-center font-medium">
          Produtor de Resíduos
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default UserTypePicker;
