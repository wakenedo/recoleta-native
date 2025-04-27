import { useRouter } from "expo-router";
import { CalendarCheck } from "lucide-react-native";
import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface UserCenterGearMenuProps {
  onLogout?: () => Promise<any>;
  setShowActions: (show: boolean) => void;
}

const UseCenterGearMenu: FC<UserCenterGearMenuProps> = ({
  onLogout,
  setShowActions,
}) => {
  const router = useRouter();
  return (
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
        <TouchableOpacity
          className="py-1"
          onPress={() => {
            router.push("/CalendarScreen");
            setShowActions(false);
          }}
        >
          <View className="flex-row items-center justify-start ">
            <View className="mr-2">
              <CalendarCheck size={16} color="#000" />
            </View>
            <Text>Calendário</Text>
          </View>
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
  );
};
export default UseCenterGearMenu;
