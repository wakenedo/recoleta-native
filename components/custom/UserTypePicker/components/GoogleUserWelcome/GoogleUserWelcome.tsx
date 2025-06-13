import { User } from "@/types";
import { UserPhoto } from "@/components/custom/UserInterface/components/UserCenter/components/UserProfile/components/UserPhoto";
import React, { FC } from "react";
import { View, Text } from "react-native";

interface GoogleUserWelcomeProps {
  user: User | null;
}

const GoogleUserWelcome: FC<GoogleUserWelcomeProps> = ({ user }) => {
  return (
    <View className="w-full mb-2 justify-center bg-white py-8 px-2 text-slate-600 rounded">
      <View>
        <UserPhoto user={user} />
      </View>
      <View className="flex-row items-center mb-2 px-2">
        <View className="mr-1 font-bold ">
          <Text>Olá,</Text>
        </View>
        <Text className="uppercase text-xl font-bold text-slate-800">
          {user?.firstName}
        </Text>
      </View>
      <View className="px-2 mb-4">
        <Text className="text-slate-600 ">
          Seja bem-vindo(a) ao ReColeta. Antes de começar, precisamos que você
          escolha seu tipo de usuário.
        </Text>
      </View>
    </View>
  );
};
export default GoogleUserWelcome;
