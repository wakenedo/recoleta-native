import React, { FC, useState } from "react";
import { Button, View, Alert } from "react-native";
import { VerifyEmailModal } from "../VerifyEmailModal";
import { router } from "expo-router";

interface VerifyEmailButtonProps {
  token: string;
  verifyEmail: (
    token: string
  ) => Promise<{ success: boolean; msg: any } | { error: boolean; msg: any }>;
  onSuccess?: () => void; // 🔁 Optional callback
}

const VerifyEmailButton: FC<VerifyEmailButtonProps> = ({
  token,
  verifyEmail,
  onSuccess,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = async () => {
    setModalVisible(true); // Show loading modal
    const result = await verifyEmail(token);
    setModalVisible(false); // Hide modal

    if ("success" in result) {
      Alert.alert("Sucesso", result.msg, [
        {
          text: "OK",
          onPress: () => {
            onSuccess?.(); // 🔁 Trigger optional logic
            router.replace("/Home"); // or your desired post-verification screen
          },
        },
      ]);
    } else {
      Alert.alert("Erro", result.msg);
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
