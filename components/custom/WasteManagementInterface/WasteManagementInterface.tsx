import React from "react";
import {
  Modal,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { SelectableResidueIcons } from "./SelectableResidueIcons";
import { QuantityInput } from "./QuantityInput";
import { ResidueConditionSelector } from "./ResidueConditionSelector";
import { PackageAvailableSelector } from "./PackageAvailableSelector";
import { AvailableDate } from "./AvailableDate";
import { ScheduleHour } from "./ScheduleHour";
import { TakeResiduePhoto } from "./TakeResiduePhoto";
import { FormControl } from "@/components/ui/form-control";
import { Button, ButtonText } from "@/components/ui/button";
import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import { useResidue } from "@/hooks/useResidue";

interface WasteManagementInterfaceProps {
  visible: boolean;
  onClose: () => void;
}

const WasteManagementInterface: React.FC<WasteManagementInterfaceProps> = ({
  visible,
  onClose,
}) => {
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
    selectedResidue?.id &&
    quantity &&
    selectedCondition &&
    selectedPackage
  );

  const handleSubmit = () => {
    if (!isFormValid) return console.log("Invalid Form Data");
    console.log("Residue Data Saved. Moving to Address Step...");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      className="shadow-lg"
    >
      <BlurView
        intensity={90}
        tint="regular"
        className="flex-1 justify-evenly px-3 pt-2"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <View
            className={`bg-white rounded-md p-4 ${
              Platform.OS === "android" ? "h-[99%]" : "max-h-[90%]"
            }`}
          >
            {/* Close Button */}
            <View className="w-full items-end mb-2">
              <TouchableOpacity
                onPress={onClose}
                className="p-2 rounded-full bg-zinc-100"
              >
                <X size={20} color="#000" />
              </TouchableOpacity>
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView keyboardShouldPersistTaps="handled">
                <Card className="border border-zinc-300 color-slate-900">
                  <View className="mb-6">
                    <Heading size="xs">
                      Detalhes do Resíduo para Descarte
                    </Heading>
                    <Text size="xs" className="mt-2">
                      Selecione o tipo de resíduo e forneça as informações
                      adicionais
                    </Text>
                  </View>

                  <FormControl className="space-y-6">
                    <SelectableResidueIcons
                      selectedResidue={selectedResidue}
                      setSelectedResidue={setResidue}
                    />

                    <QuantityInput
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
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
                    <ScheduleHour
                      selectedHour={selectedHour}
                      selectedDate={selectedDate}
                      setSelectedHour={setHour}
                    />
                    <TakeResiduePhoto
                      photo={photo || null}
                      setPhoto={setPhoto}
                    />

                    <Button
                      className={`w-fit self-end mt-4 ${
                        !isFormValid ? " bg-slate-400" : " bg-blue-500"
                      }`}
                      isDisabled={!isFormValid}
                      size="sm"
                      onPress={handleSubmit}
                    >
                      <ButtonText
                        className={`${
                          !isFormValid ? "text-slate-500" : "text-white"
                        }`}
                      >
                        Continuar
                      </ButtonText>
                    </Button>
                  </FormControl>
                </Card>
              </ScrollView>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAvoidingView>
      </BlurView>
    </Modal>
  );
};

export default WasteManagementInterface;
