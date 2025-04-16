import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

const AnimatedSplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const animationRef = useRef<LottieView>(null);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const runSplash = async () => {
      try {
        const hasSeenSplash = await AsyncStorage.getItem("hasSeenSplash");

        const devForceSplash = __DEV__ && true;

        if (hasSeenSplash && !devForceSplash) {
          await hideSplashAndFinish();
          return;
        }

        animationRef.current?.play();

        await waitForAnimation(3000); // Adjust to match your Lottie length

        await AsyncStorage.setItem("hasSeenSplash", "true");

        fadeOutSplash();
      } catch (error) {
        console.error("[Splash] Error during splash:", error);
        await hideSplashAndFinish();
      }
    };

    runSplash();
  }, []);

  const waitForAnimation = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fadeOutSplash = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(async () => {
      await hideSplashAndFinish();
    });
  };

  const hideSplashAndFinish = async () => {
    await SplashScreen.hideAsync();
    onFinish();
  };

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <LottieView
        style={{ width: 300, height: 300 }}
        source={require("../assets/animation/RecoletaSplashScreenConfig.json")}
        ref={animationRef}
        autoPlay={false}
        loop={false}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ffffff", // Match your static splash screen background color
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
});

export default AnimatedSplashScreen;
