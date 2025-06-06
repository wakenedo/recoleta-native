import React from "react";
import { CircleIcon } from "@/components/ui/icon";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { VStack } from "@/components/ui/vstack";
import { Text, View } from "react-native";
import { PackageAvailableSelectorProps } from "../types";
import { PACKAGE_OPTIONS } from "../utils/enum";

const PackageAvailableSelector: React.FC<PackageAvailableSelectorProps> = ({
  selectedPackage,
  setSelectedPackage,
}) => {
  return (
    <View className="mt-4">
      <Text className="text-md font-bold  text-orange-600">
        Embalagem Disponível
      </Text>
      <RadioGroup
        className="mt-2"
        value={selectedPackage}
        onChange={setSelectedPackage}
      >
        <VStack space="sm">
          {PACKAGE_OPTIONS.map((option) => (
            <Radio key={option} value={option} className="border-orange-600">
              <RadioIndicator className="border-orange-300 rounded-md">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>{option}</RadioLabel>
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
    </View>
  );
};

export default PackageAvailableSelector;
