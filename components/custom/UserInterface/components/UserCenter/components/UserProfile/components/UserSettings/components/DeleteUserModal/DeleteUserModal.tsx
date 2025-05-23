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
      <BlurView intensity={90} tint="regular" className="flex-1 ">
        <View className="flex-1 justify-center items-center bg-opacity-50">
          <View className="bg-white p-6 rounded shadow-lg w-80">
            <Text className="text-lg font-semibold text-center text-red-800 mb-4 uppercase">
              Atenção!
            </Text>
            <View className="mb-2">
              <Text className="text-center text-slate-700 ">
                Esta é uma decisão permanente.
              </Text>
            </View>
            <Text className="text-center text-slate-700 mb-6">
              Você tem certeza de que deseja continuar?
            </Text>
            <Text className="text-xs font-bold mb-4 text-slate-700 text-center">
              * Esta ação não pode ser desfeita.
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
