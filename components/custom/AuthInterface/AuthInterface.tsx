import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm } from "react-hook-form";
import { authSchema } from "./schemas";
import { AuthFormData } from "./types/AuthInterfaceTypes";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleAuth } from "./utils/AuthInterfaceUtils";
import { useAuth } from "@/context/AuthContext";
import { DynamicForm } from "./DynamicForm";

const AuthInterface = () => {
  const { onLogin, onRegister } = useAuth(); // ✅ Called inside the component
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showUserTypePicker, setShowUserTypePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: isRegistering
      ? {
          isRegistering: true,
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          userType: undefined,
        }
      : {
          isRegistering: false,
          email: "",
          password: "",
        },
  });

  const handleToggle = () => {
    const newVal = !isRegistering;
    setIsRegistering(newVal);
    reset(
      newVal
        ? {
            isRegistering: true,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            userType: undefined,
          }
        : {
            isRegistering: false,
            email: "",
            password: "",
          }
    );
  };

  const createHandleAuth = handleAuth(onLogin, onRegister, setIsLoading);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          style={styles.logo}
          source={require("@/assets/images/Logo.png")}
          accessibilityLabel="Logo do aplicativo"
        />
      </ScrollView>
      <DynamicForm
        key={isRegistering ? "register" : "login"}
        isRegistering={isRegistering}
        control={control}
        errors={errors}
        isLoading={isLoading}
        showUserTypePicker={showUserTypePicker}
        setShowUserTypePicker={setShowUserTypePicker}
        handleSubmit={handleSubmit}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        toggleAuthMode={handleToggle}
        handleAuth={createHandleAuth}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  logo: {
    width: 128,
    height: 128,
    alignSelf: "center",
    marginBottom: 32,
    resizeMode: "contain",
  },
});

export default AuthInterface;
