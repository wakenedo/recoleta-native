import React, { useState } from "react";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Toast from "react-native-toast-message";
import { Redirect } from "expo-router";
import "../global.css";
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen";
import { UserProvider } from "@/context/UserContext";

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [splashDone, setSplashDone] = useState(false);

  function RootLayoutNav({ splashDone }: { splashDone: boolean }) {
    const { authState } = useAuth();

    if (!splashDone || authState == null) return null; // Still playing splash animation

    return authState.authenticated ? (
      <Redirect href="/Home" />
    ) : (
      <Redirect href="/AuthScreen" />
    );
  }

  return (
    <AuthProvider>
      <UserProvider>
        {!splashDone ? (
          <AnimatedSplashScreen onFinish={() => setSplashDone(true)} />
        ) : (
          <>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" />
              <Stack.Screen name="AuthScreen" />
              <Stack.Screen name="CalendarScreen" />
            </Stack>
            <RootLayoutNav splashDone={splashDone} />
          </>
        )}
        <Toast />
      </UserProvider>
    </AuthProvider>
  );
};
export default Layout;
