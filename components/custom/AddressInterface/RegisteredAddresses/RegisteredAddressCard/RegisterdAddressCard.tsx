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
      className={`mb-3 p-4 rounded-sm shadow mt-2 bg-white ${
        selected ? "bg-green-100 border border-orange-500" : ""
      }`}
    >
      <Text className="font-medium text-slate-800">
        {item.street}, {item.number}
      </Text>
      <Text className="text-sm text-slate-600">
        {item.neighborhood}, {item.city} - {item.state}
      </Text>
      <Text className="text-xs text-slate-400">CEP: {item.postalCode}</Text>
    </Pressable>
  );
};

export default RegisteredAddressCard;
