import { Heading } from "@/components/ui/heading";
import { CircleIcon } from "@/components/ui/icon";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { View } from "react-native";
import { PackageAvailableSelectorProps } from "../types";
import { PACKAGE_OPTIONS } from "../utils/enum";

const PackageAvailableSelector: React.FC<PackageAvailableSelectorProps> = ({
  selectedPackage,
  setSelectedPackage,
}) => {
  return (
    <View>
      <Heading size="xs">Embalagem Disponível</Heading>
      <RadioGroup
        className="mt-2"
        value={selectedPackage}
        onChange={setSelectedPackage}
      >
        <VStack space="sm">
          {PACKAGE_OPTIONS.map((option) => (
            <Radio key={option} value={option}>
              <RadioIndicator className="border-zinc-300 rounded-md">
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
