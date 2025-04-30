import React, { FC, useState, useRef } from "react";
import { Modal, View, Text, TextInput, Button, Alert } from "react-native";
import { User } from "@/app/Home";
import { BlurView } from "expo-blur";
import PhoneInput from "react-native-phone-number-input";
import { CPF, CNPJ } from "@brasil-interface/utils";

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Partial<User>) => void;
}

const EditUserModal: FC<EditUserModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [phone, setPhone] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [document, setDocument] = useState("");
  const phoneInputRef = useRef<PhoneInput>(null);

  const handleSave = () => {
    if (!isValidPhone) {
      Alert.alert("Telefone inválido", "Digite um telefone válido.");
      return;
    }

    const cleanedDoc = document.replace(/\D/g, "");

    const isValidCPF = CPF.isValid(cleanedDoc);
    const isValidCNPJ = CNPJ.isValid(cleanedDoc);

    if (!isValidCPF && !isValidCNPJ) {
      Alert.alert("Documento inválido", "Digite um CPF ou CNPJ válido.");
      return;
    }

    const formattedDoc = isValidCPF
      ? CPF.mask(cleanedDoc)
      : CNPJ.mask(cleanedDoc);

    onSave({ phone, document: formattedDoc });
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView
        intensity={90}
        tint="regular"
        className="flex-1 justify-center px-3 pt-2"
      >
        <View className="flex-1 justify-center items-center bg-opacity-50">
          <View className="bg-white p-6 rounded w-11/12">
            <Text className="text-lg font-bold mb-4">Editar Perfil</Text>

            <Text className="mb-2">Telefone:</Text>
            <PhoneInput
              ref={phoneInputRef}
              defaultValue={phone}
              defaultCode="BR"
              layout="first"
              onChangeFormattedText={(text) => {
                setPhone(text);
                const isValid = phoneInputRef.current?.isValidNumber(text);
                setIsValidPhone(!!isValid);
              }}
              withShadow
              textContainerStyle={{ paddingVertical: 0 }}
              containerStyle={{ marginBottom: 16 }}
              textInputProps={{ keyboardType: "phone-pad" }}
            />

            <Text className="mb-2">Documento:</Text>
            <TextInput
              className="border p-2 rounded mb-4"
              placeholder="Digite seu CPF ou CNPJ"
              value={document}
              onChangeText={setDocument}
              keyboardType="number-pad"
            />

            <View className="flex-row justify-between">
              <Button title="Cancelar" onPress={onClose} />
              <Button title="Salvar" onPress={handleSave} />
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default EditUserModal;
