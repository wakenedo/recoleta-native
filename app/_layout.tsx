import React, { useState } from "react";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Toast from "react-native-toast-message";
import { Redirect } from "expo-router";
import "../global.css";
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen";
import { UserProvider } from "@/context/UserContext";

const Layout = () => {
  const [splashDone, setSplashDone] = useState(false);

  function RootLayoutNav({ splashDone }: { splashDone: boolean }) {
    const { authState } = useAuth();

    // Wait for splash to finish before deciding on redirect
    if (!splashDone || authState == null) return null;

    while (authState == null) {
      return <AnimatedSplashScreen onFinish={() => setSplashDone(true)} />;
    }

    if (authState.authenticated) {
      return <Redirect href="/Home" />;
    } else {
      return <Redirect href="/AuthScreen" />;
    }
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
