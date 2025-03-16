import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import {
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  LockIcon,
  ChevronDownIcon,
  User,
} from "lucide-react-native";
import { Image } from "@/components/ui/image";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";

// Schema de validação
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  userType: z.string().optional(),
});

type FormData = z.infer<typeof loginSchema>;

const AuthScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { onLogin, onRegister } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleAuth = async (data: FormData) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      if (isRegistering) {
        if (onRegister) {
          await onRegister(data.email, data.password, "", "", "");
        }
      } else {
        if (onLogin) {
          await onLogin(data.email, data.password);
        }
      }
      setIsLoading(false);
    } catch (error) {
      //toast error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormControl className="bg-white w-full h-full justify-center px-4">
      <Image
        className="mb-8 w-32 h-32 self-center"
        source={require("@/assets/images/Logo.png")}
        alt="Logo do aplicativo"
        accessibilityLabel="Logo do aplicativo"
      />

      <VStack space="md" className="p-4">
        <Heading className="font-bold text-3xl text-center">
          {isRegistering ? "Criar conta" : "Bem-vindo de volta!"}
        </Heading>

        <Text className="text-center text-typography-500 mb-8">
          {isRegistering
            ? "Junte-se a nós para um futuro sustentável"
            : "Conecte-se para contribuir com um futuro mais sustentável."}
        </Text>

        <VStack space="md">
          {isRegistering ? (
            <>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <VStack space="xs">
                    <Text>Nome completo</Text>
                    <Input
                      isInvalid={!!errors.firstName}
                      className="min-w-[250px] border border-transparent rounded-md bg-zinc-100 h-12"
                    >
                      <User className="ml-2 text-zinc-400" />

                      <InputField
                        placeholder="Informe seu nome completo"
                        value={field.value}
                        onChangeText={field.onChange}
                        autoCapitalize="none"
                      />
                    </Input>
                    {errors.firstName && (
                      <Text className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </Text>
                    )}
                  </VStack>
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <VStack space="xs">
                    <Text>Email</Text>
                    <Input
                      isInvalid={!!errors.email}
                      className="min-w-[250px] border border-transparent rounded-md bg-zinc-100 h-12"
                    >
                      <MailIcon className="ml-2 text-zinc-400" />
                      <InputField
                        placeholder="email@exemplo.com"
                        value={field.value}
                        onChangeText={field.onChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </Input>
                    {errors.email && (
                      <Text className="text-red-500 text-sm">
                        {errors.email.message}
                      </Text>
                    )}
                  </VStack>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <VStack space="xs">
                    <Text>Senha</Text>
                    <Input
                      isInvalid={!!errors.password}
                      className="min-w-[250px] border border-transparent rounded-md bg-zinc-100 h-12"
                    >
                      <LockIcon className="ml-2 text-zinc-400" />
                      <InputField
                        placeholder="Informe sua senha"
                        value={field.value}
                        onChangeText={field.onChange}
                        secureTextEntry={!showPassword}
                      />
                      <InputSlot onPress={() => setShowPassword(!showPassword)}>
                        <InputIcon
                          as={showPassword ? EyeIcon : EyeOffIcon}
                          className="text-zinc-400 mr-2"
                        />
                      </InputSlot>
                    </Input>
                    {errors.password && (
                      <Text className="text-red-500 text-sm">
                        {errors.password.message}
                      </Text>
                    )}
                  </VStack>
                )}
              />
              <Controller
                control={control}
                name="userType"
                render={({ field }) => (
                  <VStack space="xs">
                    <Text>Tipo de Usuário</Text>
                    <Select
                      onValueChange={field.onChange}
                      selectedValue={field.value}
                      isDisabled={isLoading}
                    >
                      <SelectTrigger className="w-full bg-zinc-100 h-12 rounded-md border-0">
                        <SelectInput
                          placeholder="Selecione o tipo"
                          placeholderTextColor="#9CA3AF"
                          className="text-black pl-3 text-base"
                          pointerEvents="none"
                        />
                        <SelectIcon className="mr-3">
                          <ChevronDownIcon size={20} color="#6B7280" />
                        </SelectIcon>
                      </SelectTrigger>

                      <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent className="w-full bg-white rounded-lg shadow-lg">
                          <SelectItem
                            label="Pessoa Física"
                            value="INDIVIDUAL"
                            className="px-4 py-3 border-b border-gray-200"
                            /*                             textClassName="text-black"
                             */
                          />
                          <SelectItem
                            label="Organização"
                            value="ORGANIZATION"
                            className="px-4 py-3"
                            /*                             textClassName="text-black"
                             */
                          />
                        </SelectContent>
                      </SelectPortal>
                    </Select>
                    {errors.userType && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.userType.message}
                      </Text>
                    )}
                  </VStack>
                )}
              />
            </>
          ) : (
            <>
              {" "}
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <VStack space="xs">
                    <Text>Email</Text>
                    <Input
                      isInvalid={!!errors.email}
                      className="min-w-[250px] border border-transparent rounded-md bg-zinc-100 h-12 "
                    >
                      <MailIcon className="ml-2 text-zinc-400" />
                      <InputField
                        placeholder="email@exemplo.com"
                        value={field.value}
                        onChangeText={field.onChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </Input>
                    {errors.email && (
                      <Text className="text-red-500 text-sm">
                        {errors.email.message}
                      </Text>
                    )}
                  </VStack>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <VStack space="xs">
                    <Text>Senha</Text>
                    <Input
                      isInvalid={!!errors.password}
                      className="min-w-[250px] border border-transparent rounded-md bg-zinc-100 h-12"
                    >
                      <LockIcon className="ml-2 text-zinc-400" />
                      <InputField
                        placeholder="Informe sua senha"
                        value={field.value}
                        onChangeText={field.onChange}
                        secureTextEntry={!showPassword}
                      />
                      <InputSlot onPress={() => setShowPassword(!showPassword)}>
                        <InputIcon
                          as={showPassword ? EyeIcon : EyeOffIcon}
                          className="text-zinc-400 mr-2"
                        />
                      </InputSlot>
                    </Input>
                    {errors.password && (
                      <Text className="text-red-500 text-sm">
                        {errors.password.message}
                      </Text>
                    )}
                  </VStack>
                )}
              />
            </>
          )}

          <Button
            onPress={handleSubmit(handleAuth)}
            isDisabled={isLoading}
            className="p-0 bg-primary-dark hover:bg-primary-light focus:ring-primary-dark
            flex justify-center items-center border rounded-md border-transparent mt-4 h-12 "
          >
            <ButtonText className="text-white">
              {isLoading
                ? "Caregando..."
                : isRegistering
                ? "Registrar"
                : "Login"}
            </ButtonText>
          </Button>

          <VStack className="flex-row justify-center items-center mt-4">
            <Text className="text-typography-500">
              {isRegistering ? "Já tem uma conta?" : "Não tem uma conta?"}
            </Text>
            <Button
              variant="link"
              onPress={() => setIsRegistering(!isRegistering)}
            >
              <ButtonText className="text-primary-dark font-bold ml-2">
                {isRegistering ? "Fazer login" : "Cadastre-se"}
              </ButtonText>
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </FormControl>
  );
};

export default AuthScreen;
