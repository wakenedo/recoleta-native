import { User } from "@/app/Home";
import React, { FC } from "react";
import { View, Text } from "react-native";
import { Image } from "@/components/ui/image";
import { User2 } from "lucide-react-native";

interface UserPhotoProps {
  user: User | null;
}

const UserPhoto: FC<UserPhotoProps> = ({ user }) => {
  return (
    <View className="mb-4 w-full h-fit py-2">
      {user?.photo && (
        <View className=" items-center justify-center">
          <Image
            source={{ uri: user.photo }}
            className="w-24 h-24 rounded-full"
            resizeMode="cover"
          />
        </View>
      )}
      {!user?.photo && (
        <View className=" items-center justify-center">
          <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center border-4 border-gray-300 shadow">
            <User2 size={65} color="#d1d5db" />
          </View>
          <Text className="text-center text-gray-500">Sem foto</Text>
        </View>
      )}
    </View>
  );
};
export default UserPhoto;
