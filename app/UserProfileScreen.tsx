import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { useRouter } from "expo-router";
import { User } from "./Home";
import { useAuth } from "@/context/AuthContext";

const UserProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  return (
    <View>
      <Button
        title="Voltar"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
};
export default UserProfileScreen;
