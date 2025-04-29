import React, { FC, useState } from "react";
import { Button, View, Alert } from "react-native";
import { VerifyEmailModal } from "../VerifyEmailModal";

interface VerifyEmailButtonProps {
  token: string; // token must be passed in from a parent or deep link
  verifyEmail: (
    token: string
  ) => Promise<{ success: boolean; msg: any } | { error: boolean; msg: any }>;
}

const VerifyEmailButton: FC<VerifyEmailButtonProps> = ({
  token,
  verifyEmail,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handlePress = async () => {
    setModalVisible(true); // Show the modal when verification starts
    const result = await verifyEmail(token); // Call the verifyEmail function
    setModalVisible(false); // Hide the modal after verification

    if ("success" in result) {
      Alert.alert("Sucesso", result.msg); // Show success message
    } else {
      Alert.alert("Erro", result.msg); // Show error message
    }
  };

  return (
    <View className="mb-2">
      <Button title="Verificar E-mail" onPress={handlePress} />
      <VerifyEmailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default VerifyEmailButton;
