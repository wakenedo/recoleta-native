import React from "react";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Toast from "react-native-toast-message";
import { Redirect } from "expo-router";
import "../global.css";

function RootLayoutNav() {
  const { authState } = useAuth();

  if (authState == null) return null;

  if (authState.authenticated) {
    return <Redirect href="/Home" />;
  } else {
    return <Redirect href="/AuthScreen" />;
  }
}

const Layout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" />
        <Stack.Screen name="AuthScreen" />
      </Stack>
      <RootLayoutNav />
      <Toast />
    </AuthProvider>
  );
}
export default Layout