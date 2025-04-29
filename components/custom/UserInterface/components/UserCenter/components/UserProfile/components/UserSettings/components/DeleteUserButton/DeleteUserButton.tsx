// components/DeleteUserButton.tsx
import React, { FC, useState } from "react";
import { Button, View } from "react-native";
import { DeleteUserModal } from "../DeleteUserModal";

interface DeleteUserButtonProps {
  deleteUser: () => Promise<void>;
}

const DeleteUserButton: FC<DeleteUserButtonProps> = ({ deleteUser }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      await deleteUser();
      alert("Conta deletada com sucesso!");
    } catch (error) {
      alert("Erro ao deletar conta.");
    }
  };

  return (
    <View className="mb-2">
      <Button
        title="Deletar Conta"
        color="#FF0000"
        onPress={() => setModalVisible(true)}
      />
      <DeleteUserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </View>
  );
};

export default DeleteUserButton;
