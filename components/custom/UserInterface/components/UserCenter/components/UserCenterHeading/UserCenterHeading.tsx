import { GearButton } from "@/components/custom/GearButton";
import React, { FC } from "react";
import { View, Text } from "react-native";

interface UserCenterHeadingProps {
  isProducesWaste: boolean;
  isCollectsWaste: boolean;
  setShowActions: (showActions: boolean) => void;
  userType: string;
  showActions: boolean;
}

const UserCenterHeading: FC<UserCenterHeadingProps> = ({
  isProducesWaste,
  isCollectsWaste,
  setShowActions,
  userType,
  showActions,
}) => {
  const formatteduserType = (userType: string) => {
    switch (userType) {
      case "PRODUCES_WASTE":
        return "GERADOR";
      case "COLLECTS_WASTE":
        return "COLETOR";
      default:
        return userType;
    }
  };

  return (
    <View
      className={`flex flex-row-reverse justify-between items-center mb-2 border-b ${
        isProducesWaste && !isCollectsWaste ? "border-orange-700" : ""
      } ${!isProducesWaste && isCollectsWaste ? "border-green-700" : ""}`}
    >
      <GearButton
        isCollectsWaste={isCollectsWaste}
        isProducesWaste={isProducesWaste}
        setShowActions={setShowActions}
        showActions={showActions}
      />
      <View className="mb-1">
        <Text
          className={`text-sm font-bold ${
            isProducesWaste && !isCollectsWaste ? "text-orange-700" : ""
          } ${!isProducesWaste && isCollectsWaste ? "text-green-700" : ""} `}
        >
          {formatteduserType(userType)}
        </Text>
      </View>
    </View>
  );
};
export default UserCenterHeading;
