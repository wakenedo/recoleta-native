import React from "react";
import { Controller } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { RegisterUserProps } from "../../../types/AuthInterfaceTypes";
import { RegisterUserTypePicker } from "./components/RegisterUserTypePicker";

const RegisterUser = ({
  setShowUserTypePicker,
  isLoading,
  control,
  showUserTypePicker,
  errors,
}: RegisterUserProps) => {
  return (
    <Controller
      control={control}
      name="userType"
      render={({ field }) => (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Tipo de Usuário</Text>
          <RegisterUserTypePicker
            field={field}
            setShowUserTypePicker={setShowUserTypePicker}
            showUserTypePicker={showUserTypePicker}
            isLoading={isLoading}
          />

          {errors.userType && (
            <Text style={styles.errorText}>{errors.userType.message}</Text>
          )}
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 8,
  },
  inputLabel: {
    marginBottom: 4,
    fontSize: 14,
    color: "#374151",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
});

export default RegisterUser;
