import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ChevronDown,
  User,
} from "lucide-react-native";
import { TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";

const authSchema = z.discriminatedUnion("isRegistering", [
  z.object({
    isRegistering: z.literal(true),
    firstName: z.string().min(1, "Nome é obrigatório"),
    lastName: z.string().min(1, "Sobrenome é obrigatório"),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
    userType: z.enum(["COLETOR", "GERADOR"], {
      required_error: "Selecione um tipo de usuário",
    }),
  }),
  z.object({
    isRegistering: z.literal(false),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
  }),
]);

type AuthFormData = z.infer<typeof authSchema> & {
  firstName?: string;
  lastName?: string;
  userType?: string;
};

const AuthScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showUserTypePicker, setShowUserTypePicker] = useState(false);
  const { onLogin, onRegister } = useAuth();

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

  const toggleAuthMode = () => {
    const newValue = !isRegistering;
    setIsRegistering(newValue);
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
  };

  const handleAuth = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      if (data.isRegistering) {
        const response = await onRegister?.(
          data.firstName,
          data.lastName,
          data.email,
          data.password,
          data.userType
        );
        if (response?.error) {
          throw new Error(response.msg);
        }
        Toast.show({
          type: "success",
          text1: "Cadastro realizado!",
          text2: "Bem-vindo à nossa plataforma!",
        });
      } else {
        const response = await onLogin?.(data.email, data.password);
        if (response?.error) {
          throw new Error(response.msg);
        }
        Toast.show({
          type: "success",
          text1: "Login realizado!",
          text2: "Bem-vindo de volta!",
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro de autenticação",
        text2: error.message || "Credenciais inválidas",
      });
    } finally {
      setIsLoading(false);
    }
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
    }
  ) => (
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
              secureTextEntry={config.secureTextEntry}
              keyboardType={config.keyboardType}
              autoCapitalize={config.autoCapitalize}
              accessibilityLabel={config.label}
              accessible
            />
            {name === "password" && (
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

        <View style={styles.formContainer}>
          <Text style={styles.heading}>
            {isRegistering ? "Criar conta" : "Bem-vindo de volta!"}
          </Text>

          <Text style={styles.subheading}>
            {isRegistering
              ? "Junte-se a nós para um futuro sustentável"
              : "Conecte-se para contribuir com um futuro mais sustentável."}
          </Text>

          <View style={styles.formFields}>
            {isRegistering && (
              <>
                {renderInputField("firstName", {
                  label: "Nome",
                  placeholder: "Informe seu nome",
                  icon: (
                    <User size={20} color="#9CA3AF" style={styles.inputIcon} />
                  ),
                })}

                {renderInputField("lastName", {
                  label: "Sobrenome",
                  placeholder: "Informe seu sobrenome",
                  icon: (
                    <User size={20} color="#9CA3AF" style={styles.inputIcon} />
                  ),
                })}
              </>
            )}

            {renderInputField("email", {
              label: "Email",
              placeholder: "email@exemplo.com",
              icon: <Mail size={20} color="#9CA3AF" style={styles.inputIcon} />,
              keyboardType: "email-address",
              autoCapitalize: "none",
            })}

            {renderInputField("password", {
              label: "Senha",
              placeholder: "Informe sua senha",
              icon: <Lock size={20} color="#9CA3AF" style={styles.inputIcon} />,
              secureTextEntry: !showPassword,
            })}

            {isRegistering && (
              <Controller
                control={control}
                name="userType"
                render={({ field }) => (
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Tipo de Usuário</Text>
                    <TouchableOpacity
                      style={styles.pickerTrigger}
                      onPress={() => setShowUserTypePicker(true)}
                      disabled={isLoading}
                      accessibilityLabel="Selecione o tipo de usuário"
                    >
                      <Text
                        style={
                          field.value
                            ? styles.pickerValue
                            : styles.pickerPlaceholder
                        }
                      >
                        {field.value === "GERADOR"
                          ? "Gerador de Resíduos"
                          : field.value === "COLETOR"
                          ? "Coletor de Resíduos"
                          : "Selecione o tipo"}
                      </Text>
                      <ChevronDown size={20} color="#6B7280" />
                    </TouchableOpacity>

                    {showUserTypePicker && (
                      <View style={styles.pickerContainer}>
                        <Picker
                          selectedValue={field.value}
                          onValueChange={(itemValue) => {
                            field.onChange(itemValue);
                            setShowUserTypePicker(false);
                          }}
                          itemStyle={{
                            color: "black",
                            height: 120,
                            fontSize: 16,
                          }}
                        >
                          <Picker.Item label="Selecione o tipo" value="" />
                          <Picker.Item
                            label="Gerador de Resíduos"
                            value="GERADOR"
                          />
                          <Picker.Item
                            label="Coletor de Resíduos"
                            value="COLETOR"
                          />
                        </Picker>
                      </View>
                    )}

                    {errors.userType && (
                      <Text style={styles.errorText}>
                        {errors.userType.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            )}

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSubmit(handleAuth)}
              disabled={isLoading}
              accessibilityLabel={
                isRegistering ? "Registrar conta" : "Fazer login"
              }
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>
                  {isRegistering ? "Registrar" : "Login"}
                </Text>
              )}
            </TouchableOpacity>

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
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Estilos mantidos iguais com pequenos ajustes
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
  },
  formContainer: {
    padding: 16,
  },
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
  formFields: {
    gap: 16,
  },
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
  inputIcon: {
    marginLeft: 8,
    marginRight: 8,
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
  pickerTrigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 16,
  },
  pickerPlaceholder: {
    color: "#9CA3AF",
  },
  pickerValue: {
    color: "#000000",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
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

export default AuthScreen;
