import { Address } from "@/components/custom/AddressInterface/types";
import React, { FC } from "react";
import { Text, View } from "react-native";

interface UserRegisteredAddressCardProps {
  item: Address;
}

const UserRegisteredAddressCard: FC<UserRegisteredAddressCardProps> = ({
  item,
}) => {
  return (
    <View className="mb-3 p-4 rounded-xl shadow bg-white">
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
export default UserRegisteredAddressCard;
