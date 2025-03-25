import React from "react";
import { Heading } from "@/components/ui/heading";
import { Platform, View } from "react-native";
import { Input, InputField } from "@/components/ui/input";
import { QuantityInputProps } from "../types";

const QuantityInput: React.FC<QuantityInputProps> = ({
  quantity,
  setQuantity,
}) => {
  const handleChange = (text: string) => {
    // Only allow numbers and a single dot (for decimal values)
    if (/^\d*\.?\d*$/.test(text) || text === "") {
      setQuantity(text);
    }
  };

  return (
    <View className={`${Platform.OS != "windows" ? "mt-6" : ""}`}>
      <Heading size="xs">Quantidade (em Kg)</Heading>
      <Input
        variant="outline"
        size="md"
        className="mt-2 border border-zinc-300"
      >
        <InputField
          placeholder="Ex 5.5"
          keyboardType="numeric"
          value={quantity}
          onChangeText={handleChange}
        />
      </Input>
    </View>
  );
};

export default QuantityInput;
