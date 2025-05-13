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
              <Text>Nome :</Text>
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
              <Text>E-mail :</Text>
            </View>
            <View>
              <Text className="text-lg font-light text-slate-800">
                {user?.email}
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center ">
            <View className="mr-2">
              <Text>Telefone : </Text>
            </View>
            <View>
              <Text className="text-lg font-light text-slate-800">
                {!user?.phone ? "Adicionar Phone Válido" : user?.phone}
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center ">
            <View className="mr-2">
              <Text>Tipo de Conta :</Text>
            </View>
            <View className="mr-1">
              <Text className="text-lg font-light text-slate-800">
                {!user?.accountType ? "Indeterminado" : user?.accountType}
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center ">
            <View className="mr-2">
              <Text>
                Documento {user?.accountType === "Pessoa Física" && "[CPF]:"}
                {user?.accountType === "Pessoa Jurídica" && "[CNPJ]:"}
                {user?.accountType !== "Pessoa Física" &&
                  "Pessoa Jurídica" &&
                  ":"}
              </Text>
            </View>
            <View className="mr-1">
              <Text className="text-lg font-light text-slate-800">
                {!user?.document
                  ? "Adicionar Documento Válido"
                  : user?.document}
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center ">
            <View className="mr-2">
              <Text>Tipo de Usuário :</Text>
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
              <Text>Status da Conta :</Text>
            </View>
            <View className="mr-1">
              <Text className="text-lg font-light text-slate-800">
                {user?.status === "not verified" && "Não Verificado"}
                {user?.status === "active" && "Ativa"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default UserInfo;
