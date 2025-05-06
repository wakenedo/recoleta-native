import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { QuantityInputProps } from "../types";
import { WeightIcon } from "lucide-react-native";

const QuantityInput: React.FC<QuantityInputProps> = ({ weight, setWeight }) => {
  const handleChange = (text: string) => {
    // Only allow numbers and a single dot (for decimal values)
    if (/^\d*\.?\d*$/.test(text) || text === "") {
      setWeight(text);
    }
  };

  return (
    <View className="flex-1">
      <Text className="text-md font-bold mb-2 mt-4 text-slate-800">
        Quantidade em Kg
      </Text>
      <View>
        <View style={styles.inputWrapper}>
          <WeightIcon size={18} color="#9CA3AF" style={styles.icon} />
          <TextInput
            style={styles.input}
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
const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F3F4F6", // light gray background
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  icon: {
    marginRight: 4,
  },
  input: {
    fontSize: 13,
    color: "#111827",
  },
});
export default QuantityInput;
