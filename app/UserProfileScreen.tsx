import React from "react";
import { useUser } from "@/context/UserContext";
import { UserProfile } from "@/components/custom/UserInterface/components/UserCenter/components/UserProfile";
import { BackToHomeButton } from "@/components/custom/BackToHomeButton";

const UserProfileScreen = () => {
  const { user } = useUser();

  return (
    <>
      <BackToHomeButton user={user} />
      <UserProfile user={user} />
    </>
  );
};
export default UserProfileScreen;
