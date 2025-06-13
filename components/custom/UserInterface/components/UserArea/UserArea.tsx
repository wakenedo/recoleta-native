import React, { FC } from "react";
import { View, Text, Button } from "react-native";
import { UserAreaWasteProducerActions } from "./components/UserAreaWasteProducerActions";
import { UserAreaWasteCollectorActions } from "./components/UserAreaWasteCollectorActions";
import { useRouter } from "expo-router";
import { UserAreaProps } from "../types";

const UserArea: FC<UserAreaProps> = ({ user }) => {
  const router = useRouter();
  const isProducesWaste = user.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user.userType === "COLLECTS_WASTE";

  return (
    <View className="w-full z-0">
      <View
        className={`justify-center border-l ${
          isProducesWaste && !isCollectsWaste ? "border-l-orange-300" : ""
        } ${
          !isProducesWaste && isCollectsWaste ? "border-l-green-300" : ""
        } rounded p-4 bg-white shadow-md mb-4`}
      >
        <View className="flex-row items-center mb-4">
          <Text
            className={`text-xs font-bold  ${
              isProducesWaste && !isCollectsWaste ? "text-orange-300" : ""
            } ${!isProducesWaste && isCollectsWaste ? "text-green-300" : ""}`}
          >
            AREA DO USUÁRIO
          </Text>
        </View>
        <View className="mb-2 ">
          <Text className="text-lg font-bold text-slate-800">
            Bem vindo, {user.firstName}
          </Text>
          <Text className="text-lg font-light text-slate-800">
            Pronto para organizar seus resíduos e coletas ?
          </Text>
        </View>
        <View className="mb-2">
          <Button
            title="VER TABELA DE PREÇOS"
            onPress={() => router.push("/RegionPriceTableScreen")}
          />
        </View>
        {isProducesWaste && <UserAreaWasteProducerActions />}
        {isCollectsWaste && <UserAreaWasteCollectorActions />}
      </View>
    </View>
  );
};
export default UserArea;
