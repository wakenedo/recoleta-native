import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserTypePicker } from "@/components/custom/UserTypePicker";
import { UserInterface } from "@/components/custom/UserInterface";
import { useUser } from "@/context/UserContext";

const Home: React.FC = () => {
  const { onLogout } = useAuth();
  const { user, updateUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const handleUserTypeSelect = async (
    selectedType: "COLLECTS_WASTE" | "PRODUCES_WASTE"
  ) => {
    try {
      await updateUser({ userType: selectedType });
    } catch (error: any) {
      console.error(
        "Erro ao atualizar o tipo de usuário:",
        error.response?.data || error.message
      );
      alert("Erro ao atualizar o tipo de usuário");
    }
  };

  const needsUserType =
    user &&
    !["COLLECTS_WASTE", "PRODUCES_WASTE", "admin"].includes(user.userType);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4B9CD3" />
      </View>
    );
  }

  return (
    <View className="flex-auto items-center justify-center mx-2">
      {needsUserType ? (
        <UserTypePicker onSelect={handleUserTypeSelect} />
      ) : (
        <View className="rounded-sm items-center justify-center p-1 w-full h-full">
          {user && <UserInterface user={user} onLogout={onLogout} />}
        </View>
      )}
    </View>
  );
};

export default Home;
