import React, { FC, useState } from "react";
import { Button, View } from "react-native";
import { ChangePasswordModal } from "../ChangePasswordModal";

interface ChangePasswordButtonProps {
  changePassword: (creds: {
    oldPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

const ChangePasswordButton: FC<ChangePasswordButtonProps> = ({
  changePassword,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      await changePassword(data);
      alert("Senha atualizada com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar senha.");
    }
  };

  return (
    <View className="mb-2">
      <Button title="Alterar Senha" onPress={() => setModalVisible(true)} />
      <ChangePasswordModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
};

export default ChangePasswordButton;
