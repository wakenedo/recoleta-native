import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DynamicUserActionProps } from "../../../types/AuthInterfaceTypes";

const DynamicUserAction = ({
  isRegistering,
  toggleAuthMode,
}: DynamicUserActionProps) => {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>
        {isRegistering ? "Já tem uma conta?" : "Não tem uma conta?"}
      </Text>
      <TouchableOpacity onPress={toggleAuthMode}>
        <Text style={styles.switchButton}>
          {isRegistering ? "Fazer login" : "Cadastre-se"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  switchText: {
    color: "#6B7280",
  },
  switchButton: {
    color: "#4BD609",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
export default DynamicUserAction;
