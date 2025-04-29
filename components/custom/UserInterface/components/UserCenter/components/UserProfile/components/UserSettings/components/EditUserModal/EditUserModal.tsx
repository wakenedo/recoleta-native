import React, { FC, useState } from "react";
import { Modal, View, Text, TextInput, Button } from "react-native";
import { User } from "@/app/Home";
import { BlurView } from "expo-blur";

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

  const handleSave = () => {
    if (!phone.trim()) {
      alert("Por favor, preencha o telefone.");
      return;
    }
    onSave({ phone }); // Send updated phone
    onClose(); // Close modal after saving
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
        <View className="flex-1 justify-center items-center  bg-opacity-50">
          <View className="bg-white p-6 rounded w-5/6">
            <Text className="text-lg font-bold mb-4">Editar Perfil</Text>

            <Text className="mb-2">Telefone:</Text>
            <TextInput
              className="border p-2 rounded mb-4"
              placeholder="Digite seu telefone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
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
