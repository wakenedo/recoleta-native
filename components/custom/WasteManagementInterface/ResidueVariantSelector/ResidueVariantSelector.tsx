import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FC } from "react";
import { ResidueVariant } from "../types";

type ResidueVariantSelectorProps = {
  variants: ResidueVariant[];
  selectedVariant: ResidueVariant | null;
  setSelectedVariant: (variant: ResidueVariant) => void;
};

const ResidueVariantSelector: FC<ResidueVariantSelectorProps> = ({
  variants,
  selectedVariant,
  setSelectedVariant,
}) => {
  return (
    <View className="mt-4">
      <Text className="mb-2 font-semibold">Tipo específico</Text>
      {variants.map((variant, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => setSelectedVariant(variant)}
          className={`p-3 rounded-md mb-2 border ${
            selectedVariant?.label === variant.label
              ? "border-blue-500 bg-blue-100"
              : "border-gray-300"
          }`}
        >
          <Text className="text-base font-medium">{variant.label}</Text>
          <Text className="text-xs text-gray-500">
            R$ {variant.pricePerKg}/kg • Mín: {variant.minWeightKg}kg
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ResidueVariantSelector;
