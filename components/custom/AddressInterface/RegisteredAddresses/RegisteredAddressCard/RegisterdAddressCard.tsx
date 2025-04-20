import React, { FC } from "react";
import { Text, Pressable } from "react-native";
import { Address } from "../../types";

interface RegisteredAddressCardProps {
  item: Address;
  onSelect: (id: string) => void;
  selected: boolean;
}

const RegisteredAddressCard: FC<RegisteredAddressCardProps> = ({
  item,
  onSelect,
  selected,
}) => {
  return (
    <Pressable
      onPress={() => onSelect(item._id)}
      className={`mb-3 p-4 rounded-xl shadow ${
        selected ? "bg-green-100 border border-green-500" : "bg-white"
      }`}
    >
      <Text className="font-medium">
        {item.street}, {item.number}
      </Text>
      <Text className="text-sm text-gray-600">
        {item.neighborhood}, {item.city} - {item.state}
      </Text>
      <Text className="text-xs text-gray-400">CEP: {item.postalCode}</Text>
    </Pressable>
  );
};

export default RegisteredAddressCard;
