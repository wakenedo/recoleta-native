import { LogOutIcon } from "lucide-react-native";
import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LogoutMenuItemProps } from "../../types";

const LogoutMenuItem: FC<LogoutMenuItemProps> = ({
  setShowActions,
  onLogout,
}) => {
  return (
    <TouchableOpacity
      className="py-2 rounded my-1 bg-slate-50 shadow-lg"
      onPress={() => {
        setShowActions(false);
        onLogout?.();
      }}
    >
      <View className="flex-row items-center justify-start w-60">
        <View className="my-1 mx-2 p-1">
          <LogOutIcon size={18} color="#ef4444" />
        </View>
        <Text className="text-red-500 font-light text-xl">Sair</Text>
      </View>
    </TouchableOpacity>
  );
};
export default LogoutMenuItem;
