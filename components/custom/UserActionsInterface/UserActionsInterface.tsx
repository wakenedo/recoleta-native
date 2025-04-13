import React, { useState } from "react";
import { Text, View, Button, ScrollView } from "react-native";

import { WasteManagementInterface } from "../WasteManagementInterface";
import { User } from "@/app/Home";
import { Scroll } from "lucide-react-native";

interface UserActionsInterfaceProps {
  user: User;
}

export const UserActionsInterface = ({ user }: UserActionsInterfaceProps) => {
  const [showModal, setShowModal] = useState(false);

  const userType = user.userType;
  return (
    <View className="flex flex-col w-full items-center justify-center space-y-4">
      <Text className="text-2xl font-bold text-center mb-4">
        Ações Disponíveis
      </Text>

      {userType === "PRODUCES_WASTE" && (
        <ScrollView>
          <Button title="Criar Coleta" onPress={() => setShowModal(true)} />
          <WasteManagementInterface
            visible={showModal}
            onClose={() => setShowModal(false)}
          />
        </ScrollView>
      )}

      {userType === "COLLECTS_WASTE" && (
        <Text>🔜 Interface for waste collectors will go here</Text>
      )}
    </View>
  );
};

export default UserActionsInterface;
