import React from "react";
import { Text, StyleSheet } from "react-native";
const AuthInterfaceHeading = ({
  isRegistering,
}: {
  isRegistering: boolean;
}) => {
  return (
    <>
      <Text style={styles.heading}>
        {isRegistering ? "Criar conta" : "Bem-vindo de volta!"}
      </Text>

      <Text style={styles.subheading}>
        {isRegistering
          ? "Junte-se a nós para um futuro sustentável"
          : "Conecte-se para contribuir com um futuro mais sustentável."}
      </Text>
    </>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subheading: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 32,
    marginTop: 8,
  },
});
export default AuthInterfaceHeading;
