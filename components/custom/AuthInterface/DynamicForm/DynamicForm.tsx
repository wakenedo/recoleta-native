import React from "react";
import { View, StyleSheet } from "react-native";
import { Mail, Lock, User } from "lucide-react-native";

import { RegisterUser } from "./components/RegisterUser";
import { DynamicButton } from "./components/DynamicButton";
import { GoogleButton } from "./components/GoogleButton";
import { DynamicUserAction } from "./components/DynamicUserAction";
import { renderInputField } from "../utils/AuthInterfaceUtils";
import { DynamicFormProps } from "../types/AuthInterfaceTypes";
import { AuthInterfaceHeading } from "../AuthInterfaceHeading";

const DynamicForm = ({
  isRegistering,
  control,
  errors,
  handleAuth,
  handleSubmit,
  isLoading,
  setShowUserTypePicker,
  showUserTypePicker,
  toggleAuthMode,
  showPassword,
  setShowPassword,
}: DynamicFormProps) => {
  return (
    <View style={styles.formContainer}>
      <AuthInterfaceHeading isRegistering={isRegistering} />

      <View style={styles.formFields}>
        {isRegistering && (
          <>
            {renderInputField(
              "firstName",
              {
                label: "Nome",
                placeholder: "Informe seu nome",
                icon: (
                  <User size={20} color="#9CA3AF" style={styles.inputIcon} />
                ),
              },
              control,
              errors
            )}

            {renderInputField(
              "lastName",
              {
                label: "Sobrenome",
                placeholder: "Informe seu sobrenome",
                icon: (
                  <User size={20} color="#9CA3AF" style={styles.inputIcon} />
                ),
              },
              control,
              errors
            )}
          </>
        )}

        {renderInputField(
          "email",
          {
            label: "Email",
            placeholder: "email@exemplo.com",
            icon: <Mail size={20} color="#9CA3AF" style={styles.inputIcon} />,
            keyboardType: "email-address",
            autoCapitalize: "none",
          },
          control,
          errors
        )}

        {renderInputField(
          "password",
          {
            label: "Senha",
            placeholder: "Informe sua senha",
            icon: <Lock size={20} color="#9CA3AF" style={styles.inputIcon} />,
            secureTextEntry: true, // this is just for default value, handled internally
          },
          control,
          errors,
          showPassword, // ✅ current state
          setShowPassword // ✅ toggler function
        )}

        {isRegistering && (
          <RegisterUser
            setShowUserTypePicker={setShowUserTypePicker}
            isLoading={isLoading}
            control={control}
            showUserTypePicker={showUserTypePicker}
            errors={errors}
          />
        )}

        <DynamicButton
          handleAuth={handleAuth}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isRegistering={isRegistering}
        />

        <GoogleButton />

        <DynamicUserAction
          isRegistering={isRegistering}
          toggleAuthMode={toggleAuthMode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
  },
  formFields: {
    gap: 16,
  },
  inputIcon: {
    marginLeft: 8,
    marginRight: 8,
  },
});

export default DynamicForm;
