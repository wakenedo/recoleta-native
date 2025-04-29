import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { Modal, View, Text, ActivityIndicator } from "react-native";

interface VerifyEmailModalProps {
  visible: boolean;
  onClose: () => void;
}

const VerifyEmailModal: FC<VerifyEmailModalProps> = ({ visible, onClose }) => {
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
            <Text className="text-lg font-bold mb-4">
              Verificando E-mail...
            </Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default VerifyEmailModal;
