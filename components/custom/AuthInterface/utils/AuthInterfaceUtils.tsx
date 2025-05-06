import React from "react";
import Toast from "react-native-toast-message";
import { AuthFormData } from "../types/AuthInterfaceTypes";
import { Controller, useFormContext, UseFormReset } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

const toggleAuthMode = (
  current: boolean,
  reset: UseFormReset<AuthFormData>
) => {
  const newValue = !current;
  if (newValue) {
    reset({
      isRegistering: true,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: undefined,
    });
  } else {
    reset({
      isRegistering: false,
      email: "",
      password: "",
    });
  }
  return newValue;
};

const handleAuth = (
  onLogin: ((email: string, password: string) => Promise<any>) | undefined,
  onRegister:
    | ((
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        userType: string
      ) => Promise<any>)
    | undefined,
  setIsLoading: (loading: boolean) => void
) => {
  return async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      let response;

      if (data.isRegistering) {
        response = await onRegister?.(
          data.firstName,
          data.lastName,
          data.email,
          data.password,
          data.userType
        );
      } else {
        response = await onLogin?.(data.email, data.password);
      }

      if (!response || response.error) {
        throw new Error(response?.msg || "Resposta inválida do servidor");
      }

      Toast.show({
        type: "success",
        text1: data.isRegistering ? "Cadastro realizado!" : "Login realizado!",
        text2: data.isRegistering
          ? "Bem-vindo à nossa plataforma!"
          : "Bem-vindo de volta!",
      });
    } catch (error: any) {
      console.error("❌ Auth error:", error);

      Toast.show({
        type: "error",
        text1: "Erro de autenticação",
        text2: error?.message || "Credenciais inválidas",
      });
    } finally {
      setIsLoading(false);
    }
  };
};

const renderInputField = (
  name: keyof AuthFormData,
  config: {
    label: string;
    placeholder: string;
    icon: React.ReactNode;
    secureTextEntry?: boolean;
    keyboardType?: "email-address";
    autoCapitalize?: "none";
  },
  control: any,
  errors: any,
  showPassword?: boolean,
  setShowPassword?: (value: boolean) => void
) => {
  const isPassword = name === "password";

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{config.label}</Text>
          <View style={styles.inputWrapper}>
            {config.icon}
            <TextInput
              style={styles.input}
              placeholder={config.placeholder}
              placeholderTextColor="#9CA3AF"
              value={field.value as string}
              onChangeText={field.onChange}
              secureTextEntry={
                isPassword ? !showPassword : config.secureTextEntry
              }
              keyboardType={config.keyboardType}
              autoCapitalize={config.autoCapitalize}
              accessibilityLabel={config.label}
              accessible
            />
            {isPassword && setShowPassword && (
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
                accessibilityLabel={
                  showPassword ? "Ocultar senha" : "Mostrar senha"
                }
              >
                {showPassword ? (
                  <Eye size={20} color="#9CA3AF" />
                ) : (
                  <EyeOff size={20} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            )}
          </View>
          {errors[name] && (
            <Text style={styles.errorText} accessibilityLiveRegion="polite">
              {errors[name]?.message}
            </Text>
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 8,
    color: "#1F2937",
  },
  passwordToggle: {
    padding: 8,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
});

export { toggleAuthMode, handleAuth, renderInputField };
