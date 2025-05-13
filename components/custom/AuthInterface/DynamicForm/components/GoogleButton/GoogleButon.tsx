import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

const GoogleButton = () => {
  const { onGoogleLogin } = useAuth();
  const { updateUser } = useUser();
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    try {
      setLoading(true);
      if (onGoogleLogin) {
        await onGoogleLogin(async (photo) => {
          await updateUser({ photo }); // 👈 Now user photo gets updated again!
        });
      } else {
        console.error("onGoogleLogin is undefined");
      }
    } catch (err) {
      console.error("Google login failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.googleButton, loading && styles.disabled]}
      onPress={handlePress}
      accessibilityLabel="Entrar com o Google"
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#374151" />
      ) : (
        <>
          <Image
            source={require("@/assets/images/google-icon.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Entrar com o Google</Text>
        </>
      )}
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
  disabled: {
    opacity: 0.7,
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
