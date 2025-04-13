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
        console.log("[Splash] Checking if user has seen splash...");

        const hasSeenSplash = await AsyncStorage.getItem("hasSeenSplash");
        console.log("[Splash] hasSeenSplash:", hasSeenSplash);

        const devForceSplash = __DEV__ && true;

        if (hasSeenSplash && !devForceSplash) {
          console.log("[Splash] Skipping animation");
          await hideSplashAndFinish();
          return;
        }

        console.log("[Splash] Playing animation");
        animationRef.current?.play();
        console.log("animationRef.current", animationRef.current);
        console.log(
          "Splash Lottie source",
          require("../assets/animation/RecoletaSplashScreenConfig.json")
        );

        await waitForAnimation(3000); // Adjust to match your Lottie length
        console.log("[Splash] Animation done, fading out...");

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
    console.log("[Splash] Starting fade out...");
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(async () => {
      console.log("[Splash] Fade out complete. Hiding native splash.");
      await hideSplashAndFinish();
    });
  };

  const hideSplashAndFinish = async () => {
    console.log("[Splash] Hiding splash and calling onFinish");
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
