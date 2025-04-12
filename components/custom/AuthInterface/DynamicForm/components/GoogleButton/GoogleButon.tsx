import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const GoogleButton = () => {
  const { onGoogleLogin } = useAuth();
  return (
    <TouchableOpacity
      style={styles.googleButton}
      onPress={onGoogleLogin}
      accessibilityLabel="Entrar com o Google"
    >
      <Image
        source={require("@/assets/images/google-icon.png")}
        style={styles.googleIcon}
      />
      <Text style={styles.googleButtonText}>Entrar com o Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginTop: 12,
    backgroundColor: "#FFFFFF",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
});

export default GoogleButton;
