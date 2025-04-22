import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Settings } from "lucide-react-native";
import { User } from "@/app/Home";
import { WasteProducerCenterInterface } from "./components/WasteProducerCenterInterface";

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
        {/* Gear icon */}
        <View
          className={`flex flex-row-reverse justify-between items-center mb-2 border-b ${
            isProducesWaste && !isCollectsWaste ? "border-orange-700" : ""
          } ${!isProducesWaste && isCollectsWaste ? "border-green-700" : ""}`}
        >
          <TouchableOpacity
            className="mb-1"
            onPress={() => setShowActions(!showActions)}
          >
            <Settings size={20} color={handleGearColor()} />
          </TouchableOpacity>
          <View className="mb-1">
            <Text
              className={`text-sm font-bold ${
                isProducesWaste && !isCollectsWaste ? "text-orange-700" : ""
              } ${
                !isProducesWaste && isCollectsWaste ? "text-green-700" : ""
              } `}
            >
              {formatteduserType(user.userType)}
            </Text>
          </View>
        </View>

        {/* Floating dropdown */}
        {showActions && (
          <View className="absolute top-10 right-4 bg-white p-2 rounded shadow z-10">
            <TouchableOpacity
              className="py-1"
              onPress={() => {
                console.log("Edit Profile");
                setShowActions(false);
              }}
            >
              <Text>Meu Perfil</Text>
              <TouchableOpacity
                className="py-1"
                onPress={() => {
                  console.log("Edit Profile");
                  setShowActions(false);
                }}
              >
                <Text>Estatísticas da Conta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="py-1"
                onPress={() => {
                  console.log("Edit Profile");
                  setShowActions(false);
                }}
              >
                <Text>Histórico de Coletas</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-1"
              onPress={() => {
                setShowActions(false);
                onLogout?.();
              }}
            >
              <Text className="text-red-500">Sair</Text>
            </TouchableOpacity>
          </View>
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
