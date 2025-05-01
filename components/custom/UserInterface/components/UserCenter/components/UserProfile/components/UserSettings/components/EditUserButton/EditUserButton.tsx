// components/EditUserButton.tsx
import React, { FC, useState } from "react";
import { Button, View } from "react-native";
import { User } from "@/app/Home";
import { EditUserModal } from "../EditUserModal";

interface EditUserButtonProps {
  updateUser: (data: Partial<User>) => Promise<void>;
}

const EditUserButton: FC<EditUserButtonProps> = ({ updateUser }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = async (data: Partial<User>) => {
    try {
      await updateUser(data);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar perfil.");
    }
  };

  return (
    <View className="mb-2">
      <Button title="Editar Perfil" onPress={() => setModalVisible(true)} />
      <EditUserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
};

export default EditUserButton;
