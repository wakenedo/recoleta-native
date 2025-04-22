import React, { FC } from "react";
import { Text, View } from "react-native";
import { UserRegisteredResidueCardProps } from "../../../../types";

const UserRegisteredResidueCard: FC<UserRegisteredResidueCardProps> = ({
  item,
}) => {
  return (
    <View className="mb-3 p-4 rounded-xl shadow bg-white">
      <Text className="font-medium">Nome: {item.name}</Text>
      <Text className="text-sm text-gray-600">Tipo: {item.name}</Text>
      <Text className="text-sm text-gray-600">Total: {item.weight}</Text>
    </View>
  );
};
export default UserRegisteredResidueCard;
