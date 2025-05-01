// components/modals/DeleteUserModal.tsx
import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { Modal, View, Text, Button } from "react-native";

interface DeleteUserModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteUserModal: FC<DeleteUserModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
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
          <View className="bg-white p-6 rounded-xl w-4/5">
            <Text className="text-lg font-bold mb-4 text-center">
              Tem certeza que deseja deletar sua conta?
            </Text>
            <Text className="text-lg font-bold mb-4 text-center">
              Esta ação não pode ser desfeita.
            </Text>

            <View className="flex-row justify-between">
              <Button title="Cancelar" onPress={onClose} />
              <Button title="Deletar" color="#FF0000" onPress={onConfirm} />
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default DeleteUserModal;
