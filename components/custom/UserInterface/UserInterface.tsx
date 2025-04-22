import { User } from "@/app/Home";
import React, { FC } from "react";
import { ScrollView, View } from "react-native";
import { UserActionsInterface } from "./components/UserActionsInterface";
import { UserArea } from "./components/UserArea";
import { UserCenter } from "./components/UserCenter";

interface UserInterfaceProps {
  user: User;
  onLogout: (() => Promise<any>) | undefined;
}

const UserInterface: FC<UserInterfaceProps> = ({ user, onLogout }) => {
  return (
    <ScrollView className="w-full">
      <View className="flex-1">
        <UserCenter user={user} onLogout={onLogout} />
        <UserArea user={user} />
        <UserActionsInterface user={user} />
      </View>
    </ScrollView>
  );
};
export default UserInterface;
