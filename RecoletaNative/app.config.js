// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: "RecoletaNative",
    slug: "RecoletaNative",
    extra: {
          API_URL: process.env.API_URL,
          TOKEN_KEY: process.env.TOKEN_KEY
    },
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "recoleta",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      package: "com.recoleta.android",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      googleServicesFile: "./android/app/google-services.json",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-secure-store",
      "expo-build-properties",
      "expo-router",
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
