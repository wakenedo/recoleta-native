import React from "react";
import { Button } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@/context/UserContext";
import { UserProfile } from "@/components/custom/UserInterface/components/UserCenter/components/UserProfile";

const UserProfileScreen = () => {
  const { user, loading, refreshUser } = useUser();

  console.log("UserProfileScreen", user, loading, refreshUser);
  const router = useRouter();
  return (
    <>
      <Button
        title="Voltar"
        onPress={() => {
          router.back();
        }}
      />
      <UserProfile user={user} />
    </>
  );
};
export default UserProfileScreen;
