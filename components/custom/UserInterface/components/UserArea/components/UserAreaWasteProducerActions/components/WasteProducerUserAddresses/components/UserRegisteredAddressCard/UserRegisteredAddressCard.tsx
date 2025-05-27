import React, { FC } from "react";
import { Text, View } from "react-native";
import { UserRegisteredAddressCardProps } from "../../../../types";

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
      {item.latitude && item.longitude && (
        <Text className="text-xs text-gray-500">
          Latitude: {item.latitude}, Longitude: {item.longitude}
        </Text>
      )}
      {item.complement && (
        <Text className="text-sm text-gray-500">
          Complemento: {item.complement}
        </Text>
      )}

      <Text className="text-xs text-gray-400">CEP: {item.postalCode}</Text>
    </View>
  );
};
export default UserRegisteredAddressCard;
