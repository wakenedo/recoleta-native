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
import { ResidueConditionSelectorProps } from "../types";
import { RESIDUE_CONDITIONS } from "../utils/enum";

const ResidueConditionSelector: React.FC<ResidueConditionSelectorProps> = ({
  selectedCondition,
  setSelectedCondition,
}) => {
  return (
    <View>
      <Heading size="xs">Condição do Resído</Heading>
      <RadioGroup
        className="mt-2"
        value={selectedCondition}
        onChange={setSelectedCondition}
      >
        <VStack space="sm">
          {RESIDUE_CONDITIONS.map((condition) => (
            <Radio key={condition} value={condition}>
              <RadioIndicator className="border-zinc-300">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>{condition}</RadioLabel>
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
    </View>
  );
};

export default ResidueConditionSelector;
