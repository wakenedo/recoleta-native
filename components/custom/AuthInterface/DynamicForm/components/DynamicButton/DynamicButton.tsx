import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { DynamicButtonProps } from "../../../types/AuthInterfaceTypes";

const DynamicButton = ({
  isLoading,
  handleAuth,
  handleSubmit,
  isRegistering,
}: DynamicButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, isLoading && styles.buttonDisabled]}
      onPress={handleSubmit(handleAuth)}
      disabled={isLoading}
      accessibilityLabel={isRegistering ? "Registrar conta" : "Fazer login"}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.buttonText}>
          {isRegistering ? "Registrar" : "Login"}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4BD609",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    height: 48,
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default DynamicButton;
