import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Settings } from "lucide-react-native";
import { User } from "@/app/Home";
import { WasteProducerCenterInterface } from "./components/WasteProducerCenterInterface";
import { UseCenterGearMenu } from "./components/UserCenterGearMenu";
import { UserCenterHeading } from "./components/UserCenterHeading";

interface UserCenterProps {
  user: User;
  onLogout: (() => Promise<any>) | undefined;
}

const UserCenter: FC<UserCenterProps> = ({ user, onLogout }) => {
  const isProducesWaste = user.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user.userType === "COLLECTS_WASTE";

  const [showActions, setShowActions] = useState(false);

  const testVerification = false;

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

  const handleGearColor = () => {
    if (isProducesWaste && !isCollectsWaste) {
      return "#c2410c"; // Orange color
    } else if (!isProducesWaste && isCollectsWaste) {
      return "#15803d"; // Green color
    }
    return "#000"; // Default color
  };

  return (
    <View className="w-full">
      <View
        className={`relative justify-center ${
          isProducesWaste && !isCollectsWaste ? "bg-orange-100" : ""
        } ${
          !isProducesWaste && isCollectsWaste ? "bg-green-100" : ""
        } rounded p-4 mb-4`}
      >
        {/* Header with gear button and user type text */}
        <UserCenterHeading
          isProducesWaste={isProducesWaste}
          isCollectsWaste={isCollectsWaste}
          setShowActions={setShowActions}
          userType={user.userType}
          showActions={showActions}
        />

        {/* Floating dropdown */}
        {showActions && (
          <UseCenterGearMenu
            setShowActions={setShowActions}
            onLogout={onLogout}
          />
        )}

        {isProducesWaste && (
          <WasteProducerCenterInterface
            user={user}
            hasCollects={testVerification}
          />
        )}
        {isCollectsWaste && (
          <View className="w-full border rounded h-32 items-center justify-center">
            <Text>🔜 Interface for waste collectors will go here</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default UserCenter;
