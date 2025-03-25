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
import { useResidue } from "@/hooks/useResidue";

const WasteManagementInterface = () => {
  const {
    selectedResidue,
    quantity,
    selectedCondition,
    selectedPackage,
    selectedDate,
    selectedHour,
    photo,
    setResidue,
    setQuantity,
    setCondition,
    setPackage,
    setDate,
    setHour,
    setPhoto,
    isResidueValid,
  } = useResidue();

  const isFormValid = !!(
    (selectedResidue?.id && quantity && selectedCondition && selectedPackage)
    //Add the following conditions to the form validation when they're available
    //&& selectedDate &&
    //selectedHour
  );

  const handleSubmit = () => {
    if (!isFormValid) return console.log("Invalid Form Data");

    console.log("Residue Data Saved. Moving to Address Step...");
    // Here, navigate to the Address step instead of resetting
  };

  return (
    <ScrollView className="px-2">
      <Card className="border border-zinc-300 text-slate-900">
        <View className="mb-6">
          <Heading size="xs">Detalhes do Resíduo para Descarte</Heading>
          <Text size="xs" className="mt-2">
            Selecione o tipo de resíduo e forneça as informações adicionais
          </Text>
        </View>
        <FormControl className="space-y-6">
          <SelectableResidueIcons
            selectedResidue={selectedResidue}
            setSelectedResidue={setResidue}
          />
          <QuantityInput quantity={quantity} setQuantity={setQuantity} />
          <ResidueConditionSelector
            selectedCondition={selectedCondition}
            setSelectedCondition={setCondition}
          />
          <PackageAvailableSelector
            selectedPackage={selectedPackage}
            setSelectedPackage={setPackage}
          />
          <AvailableDate
            selectedDate={selectedDate}
            setSelectedDate={setDate}
          />
          <ScheduleHour selectedHour={selectedHour} setSelectedHour={setHour} />
          <TakeResiduePhoto photo={photo} setPhoto={setPhoto} />

          <Button
            className={`w-fit self-end mt-4  ${
              isResidueValid ? "bg-slate-900  " : "bg-gray-400 opacity-50"
            }`}
            isDisabled={!isFormValid} // ✅ Dynamically disable button
            size="sm"
            onPress={handleSubmit}
          >
            <ButtonText className={`${isResidueValid ? "text-slate-50" : ""} `}>
              Continuar
            </ButtonText>
          </Button>
        </FormControl>
      </Card>
    </ScrollView>
  );
};
export default WasteManagementInterface;
