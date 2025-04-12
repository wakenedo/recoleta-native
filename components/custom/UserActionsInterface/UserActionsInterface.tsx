import React, { useState } from "react";
import { Text, View, Button } from "react-native";

import { WasteManagementInterface } from "../WasteManagementInterface";
import { User } from "@/app/Home";

interface UserActionsInterfaceProps {
  user: User;
}

export const UserActionsInterface = ({ user }: UserActionsInterfaceProps) => {
  const [showWasteManager, setShowWasteManager] = useState(false);

  if (showWasteManager) {
    return <WasteManagementInterface />;
  }

  const userType = user.userType;
  return (
    <View className="flex flex-col w-full items-center justify-center space-y-4">
      <Text className="text-2xl font-bold text-center mb-4">
        Ações Disponíveis
      </Text>

      {userType === "PRODUCES_WASTE" && (
        <View>
          <Button
            title="Gerenciar Resíduos"
            onPress={() => setShowWasteManager(true)}
          />
        </View>
      )}

      {userType === "COLLECTS_WASTE" && (
        <Text>🔜 Interface for waste collectors will go here</Text>
      )}
    </View>
  );
};

export default UserActionsInterface;
