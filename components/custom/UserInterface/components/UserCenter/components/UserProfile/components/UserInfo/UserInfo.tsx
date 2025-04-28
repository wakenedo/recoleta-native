import { User } from "@/app/Home";
import React, { FC } from "react";
import { View, Text } from "react-native";

interface UserInfoProps {
  user: User | null;
}
const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const isProducesWaste = user?.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user?.userType === "COLLECTS_WASTE";
  return (
    <View className="w-full">
      <View
        className={`justify-center border-l ${
          isProducesWaste && !isCollectsWaste ? "border-l-orange-300" : ""
        } ${
          !isProducesWaste && isCollectsWaste ? "border-l-green-300" : ""
        } rounded p-4 bg-white shadow-md mb-4 mx-3`}
      >
        <View className="flex-row items-center mb-4">
          <Text
            className={`text-xs font-bold ${
              isProducesWaste && !isCollectsWaste ? "text-orange-300" : ""
            } ${!isProducesWaste && isCollectsWaste ? "text-green-300" : ""}`}
          >
            INFORMAÇÕES DO USUÁRIO
          </Text>
        </View>
        <View className="mb-2">
          <View className="flex flex-row items-center ">
            <View className="mr-2">
              <Text>Nome:</Text>
            </View>
            <View className="mr-1">
              <Text className="text-lg font-light text-slate-800">
                {user?.firstName}
              </Text>
            </View>
            <View>
              <Text className="text-lg font-light text-slate-800">
                {user?.lastName}
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center ">
            <View className="mr-2">
              <Text>E-mail:</Text>
            </View>
            <View>
              <Text className="text-lg font-light text-slate-800">
                {user?.email}
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center ">
            <View className="mr-2">
              <Text>Telefone*:</Text>
            </View>
            <View>
              <Text className="text-lg font-light text-slate-800">
                (11) 987654321
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center ">
            <View className="mr-2">
              <Text>Tipo de Conta*:</Text>
            </View>
            <View className="mr-1">
              <Text className="text-lg font-light text-slate-800">
                Pessoa Física
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center ">
            <View className="mr-2">
              <Text>Documento [CPF] *:</Text>
            </View>
            <View className="mr-1">
              <Text className="text-lg font-light text-slate-800">
                411.111.111-11
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center ">
            <View className="mr-2">
              <Text>Tipo de Usuário:</Text>
            </View>
            <View className="mr-1">
              <Text className="text-lg font-light text-slate-800">
                {user?.userType === "PRODUCES_WASTE"
                  ? "Gerador de Resíduos"
                  : user?.userType === "COLLECTS_WASTE"
                  ? "Coletor de Resíduos"
                  : user?.userType}
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center ">
            <View className="mr-2">
              <Text>Status da Conta*:</Text>
            </View>
            <View className="mr-1">
              <Text className="text-lg font-light text-slate-800">
                Ociosa | Ativa | Bloqueada
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default UserInfo;
