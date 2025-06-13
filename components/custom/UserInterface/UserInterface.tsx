import React, { FC } from "react";
import { ScrollView, View } from "react-native";
import { UserActionsInterface } from "./components/UserActionsInterface";
import { UserArea } from "./components/UserArea";
import { UserCenter } from "./components/UserCenter";
import { WasteProducerProvider } from "@/context/WasteProducerContext";
import { UserInterfaceProps } from "@/components/types";

const UserInterface: FC<UserInterfaceProps> = ({ user, onLogout }) => {
  return (
    <ScrollView className="w-full">
      <View className="flex-1">
        {user.userType === "PRODUCES_WASTE" && (
          <WasteProducerProvider>
            <UserCenter user={user} onLogout={onLogout} />
            <UserArea user={user} />
            <UserActionsInterface user={user} />
          </WasteProducerProvider>
        )}
        {user.userType === "COLLECTS_WASTE" && (
          <>
            <UserCenter user={user} onLogout={onLogout} />
            <UserArea user={user} />
            <UserActionsInterface user={user} />
          </>
        )}
      </View>
    </ScrollView>
  );
};
export default UserInterface;
