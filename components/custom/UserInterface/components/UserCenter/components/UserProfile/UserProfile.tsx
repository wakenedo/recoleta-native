import React, { FC } from "react";
import { Text, View } from "react-native";
import { UserPhoto } from "./components/UserPhoto";
import { User } from "@/app/Home";
import { User2Icon } from "lucide-react-native";
import { UserInfo } from "./components/UserInfo";
import { UserSettings } from "./components/UserSettings";

interface UserProfileInterfaceProps {
  user: User | null;
}
const UserProfile: FC<UserProfileInterfaceProps> = ({ user }) => {
  return (
    <View className="flex-1 ">
      <View className="">
        <View className="flex-row items-center justify-start px-1">
          <View className="mr-2">
            <User2Icon size={32} color="#000" />
          </View>
          <View className="mt-2">
            <Text className="text-left text-2xl font-bold  ">
              Perfil do Usuário
            </Text>
          </View>
        </View>
        <View className="px-2 my-2">
          <Text className="text-left text-sm font-bold">
            Visualize seus dados de usuário.
          </Text>
        </View>
      </View>
      <UserPhoto user={user} />
      <UserInfo user={user} />
      <UserSettings user={user} />
    </View>
  );
};
export default UserProfile;
