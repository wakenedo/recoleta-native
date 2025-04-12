import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import * as SplashScreen from "expo-splash-screen";
import RecoletaLoading from "../../assets/Animation/RecoletaLoading.json";

SplashScreen.preventAutoHideAsync(); // Prevent the static splash screen from auto-hiding

export default function AnimatedSplashScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  useEffect(() => {
    const hideSplash = async () => {
      try {
        // Simulate loading resources or waiting for the animation to finish
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Adjust duration to match animation length
        await SplashScreen.hideAsync(); // Hide the static splash screen
        onFinish(); // Notify parent component that the splash screen is done
      } catch (error) {
        console.error("Error hiding splash screen:", error);
      }
    };

    hideSplash();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/Animation/RecoletaLoading.json")}
        autoPlay
        loop={true} // Set to true if you want the animation to loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Match your static splash screen background color
  },
});

const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push("json");

module.exports = config;
