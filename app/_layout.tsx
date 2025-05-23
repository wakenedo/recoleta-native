import React, { useState } from "react";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Toast from "react-native-toast-message";
import { Redirect } from "expo-router";
import "../global.css";
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen";
import { UserProvider } from "@/context/UserContext";
import * as SplashScreen from "expo-splash-screen";

// Prevent native splash from auto-hiding
SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <AuthProvider>
      <UserProvider>
        {/* Always show AnimatedSplashScreen first */}
        {!splashDone ? (
          <AnimatedSplashScreen onFinish={() => setSplashDone(true)} />
        ) : (
          <MainApp />
        )}
        <Toast />
      </UserProvider>
    </AuthProvider>
  );
};

const MainApp = () => {
  const { authState } = useAuth();

  if (authState == null) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" />
        <Stack.Screen name="AuthScreen" />
        <Stack.Screen name="CalendarScreen" />
      </Stack>

      {authState.authenticated ? (
        <Redirect href="/Home" />
      ) : (
        <Redirect href="/AuthScreen" />
      )}
    </>
  );
};

export default Layout;
