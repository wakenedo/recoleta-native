import React from "react";
import { useRouter } from "expo-router";
import { useUser } from "@/context/UserContext";
import { UserProfile } from "@/components/custom/UserInterface/components/UserCenter/components/UserProfile";
import { BackToHomeButton } from "@/components/custom/BackToHomeButton";

const UserProfileScreen = () => {
  const { user, loading, refreshUser } = useUser();

  console.log("UserProfileScreen", user, loading, refreshUser);
  const router = useRouter();
  return (
    <>
      <BackToHomeButton user={user} />
      <UserProfile user={user} />
    </>
  );
};
export default UserProfileScreen;
