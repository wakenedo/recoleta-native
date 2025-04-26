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
        animationRef.current?.play(); // Start the Lottie animation

        await waitForAnimation(3000); // Wait 3 seconds (or match your animation time)

        fadeOutSplash(); // Fade out splash and reveal app
      } catch (error) {
        console.error("[Splash] Error during splash:", error);
        await hideSplashAndFinish(); // Fallback if anything goes wrong
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
