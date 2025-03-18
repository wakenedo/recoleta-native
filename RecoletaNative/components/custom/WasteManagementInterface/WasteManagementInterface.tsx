import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ScrollView, View } from "react-native";
import React from "react";
import { SelectableResidueIcons } from "./SelectableResidueIcons";
import { QuantityInput } from "./QuantityInput";
import { ResidueConditionSelector } from "./ResidueConditionSelector";
import { PackageAvailableSelector } from "./PackageAvailableSelector";
import { AvailableDate } from "./AvailableDate";
import { ScheduleHour } from "./ScheduleHour";
import { TakeResiduePhoto } from "./TakeResiduePhoto";
import { FormControl } from "@/components/ui/form-control";
import { Button, ButtonText } from "@/components/ui/button";

const WasteManagementInterface = () => {
  const teste = true;

  const [isInvalid, setIsInvalid] = React.useState(false);

  const handleSubmit = () => {
    if (!teste) {
      console.log("Valid");
    } else {
      console.log("Invalid");
    }
  };

  return (
    <ScrollView className="px-2">
      <Card className="border border-zinc-300 space-y-6 color-slate-900">
        <View>
          <Heading size="xs">Detalhes do Resíduo para Descarte</Heading>
          <Text size="xs" className="mt-2">
            Selecione o tipo de resído e forneça as informações adicionais
          </Text>
        </View>
        <FormControl>
          <SelectableResidueIcons />
          <QuantityInput />
          <ResidueConditionSelector />
          <PackageAvailableSelector />
          <AvailableDate />
          <ScheduleHour />
          <TakeResiduePhoto />
          <Button
            className="w-fit self-end mt-4 color-slate-50 bg-slate-900"
            isDisabled={true}
            size="sm"
            onPress={handleSubmit}
          >
            <ButtonText>Submit</ButtonText>
          </Button>
        </FormControl>
      </Card>
    </ScrollView>
  );
};

export default WasteManagementInterface;
