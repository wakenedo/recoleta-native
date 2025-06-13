import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { Button, Modal, Text, View } from "react-native";
import { UserTypeConfirmModalProps } from "../types";

const UserTypeConfirmModal: FC<UserTypeConfirmModalProps> = ({
  isModalVisible,
  handleConfirm,
  handleCancel,
}) => {
  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <BlurView intensity={90} tint="regular" className="flex-1  ">
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
            <View className="flex-row justify-around">
              <Button title="Cancelar" onPress={handleCancel} />
              <Button title="Confirmar" onPress={handleConfirm} />
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};
export default UserTypeConfirmModal;
