import { useRouter } from "expo-router";
import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { determineIcon } from "../../utils";
import { GearMenuItemProps, redirectUrlType } from "../../types";

const GearMenuItem: FC<GearMenuItemProps> = ({
  title,
  setShowActions,
  redirectUrl,
  isWasteProducer,
  isWasteCollector,
}) => {
  const router = useRouter();
  const url: redirectUrlType = redirectUrl as redirectUrlType;

  return (
    <TouchableOpacity
      className="py-2 rounded my-1 bg-slate-50 shadow-lg"
      onPress={() => {
        console.log("Clicado em : ", title);
        console.log("Redirecting to: ", url);
        router.push(url);
        setShowActions(false);
      }}
    >
      <View className="flex-row items-center justify-start w-60">
        <View
          className={`my-1 mx-2 rounded p-1 ${
            isWasteProducer && "bg-orange-400"
          } ${isWasteCollector && "bg-green-400"}`}
        >
          {determineIcon(title)}
        </View>
        <Text
          className={`${isWasteProducer && "text-orange-800"} ${
            isWasteCollector && "text-green-800"
          } font-light text-xl`}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default GearMenuItem;
