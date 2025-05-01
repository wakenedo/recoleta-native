import React, { FC, useState } from "react";
import { Modal, View, Text, TextInput, Button } from "react-native";
import { BlurView } from "expo-blur";

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (credentials: { oldPassword: string; newPassword: string }) => void;
}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  onClose,
  visible,
  onSave,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSave = () => {
    if (!oldPassword.trim() || !newPassword.trim()) {
      alert("Por favor, preencha ambos os campos.");
      return;
    }

    onSave({ oldPassword, newPassword });
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
          <View className="bg-white p-6 rounded w-5/6">
            <Text className="text-lg font-bold mb-4">Alterar Senha</Text>

            <Text className="mb-2">Senha atual:</Text>
            <TextInput
              className="border p-2 rounded mb-4"
              placeholder="Digite sua senha atual"
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />

            <Text className="mb-2">Nova senha:</Text>
            <TextInput
              className="border p-2 rounded mb-4"
              placeholder="Digite sua nova senha"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
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

export default ChangePasswordModal;
