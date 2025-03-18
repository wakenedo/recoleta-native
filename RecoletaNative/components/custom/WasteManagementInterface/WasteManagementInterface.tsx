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
import { Residue } from "./types";

const WasteManagementInterface = () => {
  const [selectedResidue, setSelectedResidue] = React.useState<Residue | null>(
    null
  );
  const [quantity, setQuantity] = React.useState<string>("");
  const [selectedCondition, setSelectedCondition] =
    React.useState<string>("Limpo");
  const [selectedPackage, setSelectedPackage] =
    React.useState<string>("Caixa de Papelão");
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [selectedHour, setSelectedHour] = React.useState<string | null>(null);
  const [photo, setPhoto] = React.useState<string | null>(null);

  const isFormValid = !!(
    (selectedResidue?.id && quantity && selectedCondition && selectedPackage)
    //Add the following conditions to the form validation when they're available
    //&& selectedDate &&
    //selectedHour
  );

  const generatePayload = () => {
    if (!isFormValid) return null;

    return {
      residueId: selectedResidue.id, // Send only ID (or title if needed)
      quantity,
      condition: selectedCondition,
      packageType: selectedPackage,
      availableDate: selectedDate,
      scheduleHour: selectedHour,
      photo: photo || null, // Optional
    };
  };

  const handleSubmit = () => {
    const payload = generatePayload();
    if (payload) {
      console.log("Submitting Data:", payload);
      // Send data to the backend or further processing here

      // ✅ Clear form after successful submission
      setSelectedResidue(null);
      setQuantity("");
      setSelectedCondition("Limpo");
      setSelectedPackage("Caixa de Papelão");
      setSelectedDate(null);
      setSelectedHour(null);
      setPhoto(null);
    } else {
      console.log("Invalid Form Data");
    }
  };

  return (
    <ScrollView className="px-2">
      <Card className="border border-zinc-300 color-slate-900">
        <View className="mb-6">
          <Heading size="xs">Detalhes do Resíduo para Descarte</Heading>
          <Text size="xs" className="mt-2">
            Selecione o tipo de resíduo e forneça as informações adicionais
          </Text>
        </View>
        <FormControl className="space-y-6">
          <SelectableResidueIcons
            selectedResidue={selectedResidue}
            setSelectedResidue={setSelectedResidue}
          />
          <QuantityInput quantity={quantity} setQuantity={setQuantity} />
          <ResidueConditionSelector
            selectedCondition={selectedCondition}
            setSelectedCondition={setSelectedCondition}
          />
          <PackageAvailableSelector
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
          />
          <AvailableDate />
          <ScheduleHour />
          <TakeResiduePhoto />

          <Button
            className="w-fit self-end mt-4 color-slate-50 bg-slate-900"
            isDisabled={!isFormValid} // ✅ Dynamically disable button
            size="sm"
            onPress={handleSubmit}
          >
            <ButtonText>Continuar</ButtonText>
          </Button>
        </FormControl>
      </Card>
    </ScrollView>
  );
};
export default WasteManagementInterface;
