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
const ResidueConditionSelector = () => {
  const [values, setValues] = React.useState("Limpo");
  return (
    <View>
      <Heading size="xs">Condição do Resído</Heading>
      <RadioGroup className="mt-2" value={values} onChange={setValues}>
        <VStack space="sm">
          <Radio value="Limpo">
            <RadioIndicator className=" border-zinc-300">
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Limpo</RadioLabel>
          </Radio>
          <Radio value="Sujo">
            <RadioIndicator className=" border-zinc-300">
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Sujo</RadioLabel>
          </Radio>
          <Radio value="Misto">
            <RadioIndicator className=" border-zinc-300">
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Misto</RadioLabel>
          </Radio>
        </VStack>
      </RadioGroup>
    </View>
  );
};
export default ResidueConditionSelector;
