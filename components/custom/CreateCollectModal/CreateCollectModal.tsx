import React, { useState } from "react";
import {
  Modal,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import { WasteManagementInterface } from "../WasteManagementInterface";
import { AddressInterface } from "../AddressInterface";
import { useResidue } from "@/hooks/useResidue";
import { useAddress } from "@/hooks/useAddress";
import { useCollectEvent } from "@/hooks/useCollectHookEvent";

interface ResidueModalFlowProps {
  visible: boolean;
  onClose: () => void;
}

const ResidueModalFlow: React.FC<ResidueModalFlowProps> = ({
  visible,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const { isResidueValid, payloadResidue } = useResidue();
  const { isAddressValid } = useAddress();
  const { handleSubmit, loading } = useCollectEvent();

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const handleNext = async () => {
    if (step === 1 && isResidueValid) setStep(2);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  console.log("Residue Payload", payloadResidue);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <BlurView
        intensity={90}
        tint="regular"
        className="flex-1 justify-center px-3 pt-2"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              className={`bg-white rounded-md p-4 justify-between ${
                Platform.OS === "android" ? "h-[99%]" : "max-h-[90%]"
              }`}
            >
              {/* Close Button */}
              <View className="w-full items-end mb-2">
                <TouchableOpacity
                  onPress={handleClose}
                  className="p-2 rounded-full bg-zinc-100"
                >
                  <X size={20} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Content */}
              <ScrollView
                className="flex-1"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                {step === 1 ? (
                  <WasteManagementInterface />
                ) : (
                  <AddressInterface />
                )}
              </ScrollView>

              {/* Sticky Footer Navigation */}
              <View className="flex-row justify-between items-center mt-4">
                {step === 2 && (
                  <TouchableOpacity
                    onPress={handleBack}
                    className="bg-gray-200 px-4 py-2 rounded-lg"
                  >
                    <Text>Voltar</Text>
                  </TouchableOpacity>
                )}
                {step === 1 && (
                  <TouchableOpacity
                    onPress={handleNext}
                    className={`px-4 py-2 rounded-lg ${
                      isResidueValid ? "bg-green-500" : "bg-gray-300"
                    }`}
                    disabled={!isResidueValid}
                  >
                    <Text className="text-white">Continuar</Text>
                  </TouchableOpacity>
                )}
                {step === 2 && (
                  <TouchableOpacity
                    onPress={async () => {
                      const success = await handleSubmit();
                      if (success) handleClose();
                    }}
                    className={`px-4 py-2 rounded-lg ${
                      isAddressValid ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    disabled={!isAddressValid || loading}
                  >
                    <Text className="text-white">
                      {loading ? "Salvando..." : "Confirmar"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </BlurView>
    </Modal>
  );
};

export default ResidueModalFlow;
