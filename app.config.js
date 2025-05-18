// app.config.js
import "dotenv/config";

export default {
  expo: {
    icon: "./assets/icon.png",
    name: "Recoleta",
    slug: "RecoletaNative",
    version: "1.0.0",
    orientation: "portrait",
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
      googleServicesFile: "./android/app/google-services.json",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    extra: {
      API_URL: process.env.API_URL,
      LOCAL_API_URL: process.env.LOCAL_API_URL,
      TOKEN_KEY: process.env.TOKEN_KEY,
      GOOGLE_SERVICE_JSON: process.env.GOOGLE_SERVICE_JSON,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      WEB_CLIENT_ID: process.env.WEB_CLIENT_ID,
      eas: {
        projectId: "135c9e91-f3a9-4432-b7c8-9d23311b0166",
      },
    },
    plugins: [
      "expo-secure-store",
      "expo-build-properties",
      "expo-router",
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow Recoleta to use your location.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
