import React from "react";
import { View, Text } from "react-native";
import { WasteManagementHeadingSectionProps } from "../types";

const WasteManagementHeadingSection: React.FC<
  WasteManagementHeadingSectionProps
> = ({ title, description }) => {
  return (
    <View className="mb-4">
      <Text className="text-orange-600 font-bold text-base">{title}</Text>
      <Text className="mt-2 text-xs">{description}</Text>
    </View>
  );
};
export default WasteManagementHeadingSection;
