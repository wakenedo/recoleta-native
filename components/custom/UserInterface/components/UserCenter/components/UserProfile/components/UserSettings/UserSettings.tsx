import { User } from "@/app/Home";
import React, { FC } from "react";
import { Button, Text, View } from "react-native";

interface UserSettingsProps {
  user: User | null;
}

const UserSettings: FC<UserSettingsProps> = ({ user }) => {
  const isProducesWaste = user?.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user?.userType === "COLLECTS_WASTE";
  // Emula a necessidade de verificar o e-mail
  // Isso deve ser substituído pela lógica real quando a verificação de e-mail for implementada
  const teste = true;
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
            CONFIGURAÇÕES DO USUÁRIO
          </Text>
        </View>
        <View className="mb-2">
          <View className="mb-2">
            {teste === true && (
              <View className="mb-2">
                <Button
                  title="Verificar E-mail"
                  onPress={() => console.log("Verificar E-mail Clicado")}
                />
              </View>
            )}

            <Button
              title="Editar Perfil"
              onPress={() => console.log("Editar Perfil Clicado")}
            />
          </View>

          <View className="mb-2">
            <Button
              title="Alterar Senha"
              onPress={() => console.log("Alterar Senha Clicado")}
            />
          </View>
          <View className="mb-2">
            <Button
              title="Reportar Problema"
              onPress={() => console.log("Reportar Problema Clicado")}
            />
          </View>
          <View className="mb-2">
            <Button
              title="Termos de Uso"
              onPress={() => console.log("Termos de Uso Clicado")}
            />
          </View>
          <View className="mb-2">
            <Button
              title="Deletar Conta"
              onPress={() => console.log("Deletar Conta Clicado")}
              color={"#FF0000"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default UserSettings;
