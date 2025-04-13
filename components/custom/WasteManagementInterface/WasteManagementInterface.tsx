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
import { Residue } from "./types";
import { X } from "lucide-react-native";

interface WasteManagementInterfaceProps {
  visible: boolean;
  onClose: () => void;
}

const WasteManagementInterface: React.FC<WasteManagementInterfaceProps> = ({
  visible,
  onClose,
}) => {
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
    selectedResidue?.id &&
    quantity &&
    selectedCondition &&
    selectedPackage
  );

  const generatePayload = () => {
    if (!isFormValid) return null;
    return {
      residueName: selectedResidue.name,
      quantity,
      condition: selectedCondition,
      packageType: selectedPackage,
      availableDate: selectedDate,
      scheduleHour: selectedHour,
      photo: photo || null,
    };
  };

  const handleSubmit = () => {
    const payload = generatePayload();
    if (payload) {
      console.log("Submitting Data:", payload);
      // Reset form and close
      setSelectedResidue(null);
      setQuantity("");
      setSelectedCondition("Limpo");
      setSelectedPackage("Caixa de Papelão");
      setSelectedDate(null);
      setSelectedHour(null);
      setPhoto(null);
      onClose();
    } else {
      console.log("Invalid Form Data");
    }
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
                      setSelectedResidue={setSelectedResidue}
                    />
                    <QuantityInput
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
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
