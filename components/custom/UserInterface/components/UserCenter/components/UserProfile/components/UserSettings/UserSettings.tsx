import { User } from "@/app/Home";
import React, { FC } from "react";
import { Button, Text, View } from "react-native";
import { useUser } from "@/context/UserContext";
import { DeleteUserButton } from "./components/DeleteUserButton";
import { EditUserButton } from "./components/EditUserButton";
import ChangePasswordButton from "./components/ChangePasswordButton/ChangePasswordButton";
import { useAuth } from "@/context/AuthContext";
import { VerifyEmailButton } from "./components/VerifyEmailButton";

interface UserSettingsProps {
  user: User | null;
}

const UserSettings: FC<UserSettingsProps> = ({ user }) => {
  const isProducesWaste = user?.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user?.userType === "COLLECTS_WASTE";
  const { updateUser, deleteUser, changePassword } = useUser();
  const { verifyEmail, authState } = useAuth();
  const verifyEmailHandler = verifyEmail
    ? verifyEmail
    : async () => Promise.resolve({ error: true, msg: "No operation" });

  const token = authState?.token || "";

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
          {teste === true && token && (
            <VerifyEmailButton token={token} verifyEmail={verifyEmailHandler} />
          )}
          <EditUserButton updateUser={updateUser} />

          <ChangePasswordButton
            changePassword={({ oldPassword, newPassword }) =>
              changePassword(oldPassword, newPassword)
            }
          />
          <View className="mb-2">
            <Button
              title="Reportar Problema"
              onPress={() => console.log("Reportar Problema Clicado")}
              disabled={true}
            />
          </View>
          <View className="mb-2">
            <Button
              title="Termos de Uso"
              onPress={() => console.log("Termos de Uso Clicado")}
              disabled={true}
            />
          </View>
          <DeleteUserButton deleteUser={deleteUser} />
        </View>
      </View>
    </View>
  );
};
export default UserSettings;
