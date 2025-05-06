import React, { FC } from "react";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { HomeIcon } from "lucide-react-native";
import { User } from "@/app/Home";

interface BackToHomeButtonProps {
  user: User | null;
}

const BackToHomeButton: FC<BackToHomeButtonProps> = ({ user }) => {
  const router = useRouter();

  const producesWaste = user?.userType === "PRODUCES_WASTE";
  const collectsWaste = user?.userType === "COLLECTS_WASTE";

  const iconColor = producesWaste
    ? "#c2410c"
    : collectsWaste
    ? "#15803d"
    : "#000000";

  return (
    <View className="absolute right-0 top-3 z-50">
      <View
        className={`flex flex-row mx-2  rounded-full shadow-lg
                  ${producesWaste && !collectsWaste ? "bg-orange-200" : ""} 
                  ${!producesWaste && collectsWaste ? "bg-green-200" : ""}
                `}
      >
        <Pressable onPress={() => router.back()}>
          <View className="flex-row items-center justify-center p-2 rounded-full ">
            <HomeIcon size={22} color={iconColor} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default BackToHomeButton;
