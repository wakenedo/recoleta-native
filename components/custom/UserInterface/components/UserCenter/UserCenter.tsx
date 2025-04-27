import React, { FC, useState } from "react";
import { View, Text } from "react-native";
import { User } from "@/app/Home";
import { WasteProducerCenterInterface } from "./components/WasteProducerCenterInterface";
import { UseCenterGearMenu } from "./components/UserCenterGearMenu";
import { UserCenterHeading } from "./components/UserCenterHeading";
import { WasteProducerProvider } from "@/context/WasteProducerContext";

interface UserCenterProps {
  user: User;
  onLogout: (() => Promise<any>) | undefined;
}

const UserCenter: FC<UserCenterProps> = ({ user, onLogout }) => {
  const isProducesWaste = user.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user.userType === "COLLECTS_WASTE";

  const [showActions, setShowActions] = useState(false);

  const testVerification = false;

  return (
    <View className="w-full z-10">
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
            userType={user.userType}
          />
        )}

        {isProducesWaste && (
          <WasteProducerProvider>
            <WasteProducerCenterInterface
              user={user}
              hasCollects={testVerification}
            />
          </WasteProducerProvider>
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
