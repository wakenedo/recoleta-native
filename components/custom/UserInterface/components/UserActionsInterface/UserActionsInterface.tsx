import React, { useState } from "react";
import { Text, View } from "react-native";
import { User } from "@/app/Home";
import { WasteProducerActions } from "./components/WasteProducerActions";

interface UserActionsInterfaceProps {
  user: User;
}

export const UserActionsInterface = ({ user }: UserActionsInterfaceProps) => {
  const [showModal, setShowModal] = useState(false);

  const userType = user.userType;
  const isProducesWaste = userType === "PRODUCES_WASTE";
  const isCollectsWaste = userType === "COLLECTS_WASTE";
  return (
    <View className="w-full flex-1">
      <View
        className={`justify-center border-l ${
          isProducesWaste && !isCollectsWaste ? "border-l-orange-300" : ""
        } ${
          !isProducesWaste && isCollectsWaste ? "border-l-green-300" : ""
        } rounded p-4 bg-white shadow-md mb-4`}
      >
        <View className="flex-row items-center mb-4">
          <Text
            className={`text-xs font-bold ${
              isProducesWaste && !isCollectsWaste ? "text-orange-300" : ""
            } ${!isProducesWaste && isCollectsWaste ? "text-green-300" : ""}`}
          >
            AÇÕES
          </Text>
        </View>

        {userType === "PRODUCES_WASTE" && (
          <WasteProducerActions
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}

        {userType === "COLLECTS_WASTE" && (
          <Text>🔜 Interface for waste collectors will go here</Text>
        )}
      </View>
    </View>
  );
};

export default UserActionsInterface;
