import React, { FC } from "react";
import { View } from "react-native";
import { UserPhoto } from "./components/UserPhoto";
import { User } from "@/app/Home";

interface UserProfileProps {
  user: User;
}
const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <View>
      <UserPhoto user={user} />
    </View>
  );
};
export default UserProfile;
