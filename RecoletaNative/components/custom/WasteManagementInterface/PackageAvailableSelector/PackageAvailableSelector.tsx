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

const PackageAvailableSelector = () => {
  const [values, setValues] = React.useState("Limpo");
  return (
    <View>
      <Heading size="xs">Embalagem Disponível</Heading>
      <RadioGroup className="mt-2" value={values} onChange={setValues}>
        <VStack space="sm">
          <Radio value="Limpo">
            <RadioIndicator className=" border-zinc-300 rounded-md">
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Caixa de Papelão</RadioLabel>
          </Radio>
          <Radio value="Sujo">
            <RadioIndicator className=" border-zinc-300 rounded-md">
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Saco de Lixo</RadioLabel>
          </Radio>
          <Radio value="Misto">
            <RadioIndicator className=" border-zinc-300 rounded-md">
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Solto</RadioLabel>
          </Radio>
        </VStack>
      </RadioGroup>
    </View>
  );
};

export default PackageAvailableSelector;
