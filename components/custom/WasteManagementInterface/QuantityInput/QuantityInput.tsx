import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { QuantityInputProps } from "../types";
import { WeightIcon } from "lucide-react-native";

const QuantityInput: React.FC<QuantityInputProps> = ({
  weight,
  setWeight,
  inputBackgroundColor,
}) => {
  const handleChange = (text: string) => {
    // Only allow numbers and a single dot (for decimal values)
    if (/^\d*\.?\d*$/.test(text) || text === "") {
      setWeight(text);
    }
  };

  return (
    <View>
      <Text className="text-md font-bold mb-2 mt-2 text-orange-600">
        Peso (kg)
      </Text>
      <View>
        <View
          className={`flex flex-row items-center w-full  rounded-lg  py-2 px-1`}
          style={{ backgroundColor: inputBackgroundColor || "#F3F4F6" }}
        >
          <View className="mr-1 ml-1">
            <WeightIcon size={18} color="#9CA3AF" />
          </View>
          <TextInput
            className="text-sm text-slate-800"
            placeholder="Ex: 123.45"
            value={weight}
            onChangeText={handleChange}
            keyboardType="numeric"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
    </View>
  );
};
export default QuantityInput;
