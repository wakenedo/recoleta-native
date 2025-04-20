import React, { FC } from "react";
import { View, Text } from "react-native";
import { Address } from "../../types";

interface RegisteredAddressCardProps {
  item: Address;
}

const RegisteredAddressCard: FC<RegisteredAddressCardProps> = ({ item }) => {
  return (
    <View className="mb-3 p-4 bg-white rounded-xl shadow ">
      <Text className="font-medium">
        {item.street}, {item.number}
      </Text>
      <Text className="text-sm text-gray-600">
        {item.neighborhood}, {item.city} - {item.state}
      </Text>
      <Text className="text-xs text-gray-400">CEP: {item.postalCode}</Text>
    </View>
  );
};
export default RegisteredAddressCard;
