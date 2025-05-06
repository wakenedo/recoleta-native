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
  const isProducesWaste = user?.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user?.userType === "COLLECTS_WASTE";

  const iconColor = isProducesWaste
    ? "#c2410c"
    : isCollectsWaste
    ? "#15803d"
    : "#000000";

  return (
    <View className="flex-1 ">
      <View className="py-4">
        <View
          className={`flex flex-row mx-2 border-b 
            ${isProducesWaste && !isCollectsWaste ? "border-orange-700" : ""} 
            ${!isProducesWaste && isCollectsWaste ? "border-green-700" : ""}
          `}
        >
          <View className="mr-2">
            <User2Icon size={32} color={iconColor} />
          </View>
          <View className="mt-2">
            <Text
              className={`text-left text-3xl font-bold  ${
                isProducesWaste && !isCollectsWaste ? "text-orange-700" : ""
              } 
            ${!isProducesWaste && isCollectsWaste ? "text-green-700" : ""}`}
            >
              PERFIL
            </Text>
          </View>
        </View>
      </View>
      <UserPhoto user={user} />
      <UserInfo user={user} />
      <UserSettings user={user} />
    </View>
  );
};
export default UserProfile;
