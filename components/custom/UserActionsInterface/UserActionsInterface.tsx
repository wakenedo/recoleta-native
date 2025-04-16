import React, { useState } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import { User } from "@/app/Home";
import { CollectFlowProvider } from "@/context/CollectFlowContext";
import { CreateCollectModal } from "../CreateCollectModal";

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

          <CollectFlowProvider>
            <CreateCollectModal
              visible={showModal}
              onClose={() => setShowModal(false)}
            />
          </CollectFlowProvider>
        </ScrollView>
      )}

      {userType === "COLLECTS_WASTE" && (
        <Text>🔜 Interface for waste collectors will go here</Text>
      )}
    </View>
  );
};

export default UserActionsInterface;
