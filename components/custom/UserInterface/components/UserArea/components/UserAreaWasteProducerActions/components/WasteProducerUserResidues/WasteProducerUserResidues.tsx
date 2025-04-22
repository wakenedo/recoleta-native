import { Residue } from "@/components/custom/WasteManagementInterface/types";
import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import React, { FC } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { UserRegisteredResidueCard } from "./components/UserRegisterResidueCard";
import { WasteProducerUserResiduesProps } from "../../types";

const WasteProducerUserResidues: FC<WasteProducerUserResiduesProps> = ({
  residues,
  visible,
  onClose,
  loading,
  error,
}) => {
  const handleClose = () => {
    onClose();
  };

  const deduplicateResidues = (residues: Residue[]): Residue[] => {
    const map = new Map<string, Residue>();

    for (const residue of residues) {
      const name = residue.name.trim();

      if (map.has(name)) {
        const existing = map.get(name)!;
        const newWeight =
          (Number(existing.weight) || 0) + (Number(residue.weight) || 0);
        map.set(name, { ...existing, weight: newWeight });
      } else {
        map.set(name, { ...residue });
      }
    }

    return Array.from(map.values());
  };

  const uniqueResidues = deduplicateResidues(residues);

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
              className={`bg-white rounded-md p-4  ${
                Platform.OS === "android" ? "h-[99%]" : "max-h-[90%]"
              }`}
            >
              <View className="w-full items-end mb-2">
                <TouchableOpacity
                  onPress={handleClose}
                  className="p-2 rounded-full bg-zinc-100"
                >
                  <X size={20} color="#000" />
                </TouchableOpacity>
              </View>
              <Text className="text-lg font-bold mb-2">
                Resídos Cadastrados
              </Text>
              <Text className="text-sm text-gray-600 mb-4">
                Aqui estão os resídos que você cadastrou.
              </Text>

              {error && <Text className="text-red-500 mb-4">{error}</Text>}
              {loading ? (
                <View className="justify-center items-center my-6">
                  <ActivityIndicator size="large" />
                </View>
              ) : residues.length === 0 ? (
                <Text className="text-gray-500">
                  Nenhum endereço cadastrado ainda.
                </Text>
              ) : (
                uniqueResidues.map((item) => (
                  <UserRegisteredResidueCard item={item} key={item.image} />
                ))
              )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </BlurView>
    </Modal>
  );
};
export default WasteProducerUserResidues;
