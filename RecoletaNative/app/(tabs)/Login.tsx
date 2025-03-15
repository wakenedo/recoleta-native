import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";

function App() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("");
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const register = async () => {
    const result = await onRegister!(
      firstName,
      lastName,
      email,
      password,
      userType
    );
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };

  return (
    <FormControl className=" bg-white w-full h-full flex items-center px-4 pt-5">
      <Image
        className="mb-8 w-32 h-32 mt-8"
        source={require("@/assets/images/Logo.png")}
        alt="image"
      />

      <VStack space="sm" className="p-4">
        <Heading className="font-bold text-3xl">Bem-vindo de volta!</Heading>
        <Text className="font-normal text-base mb-12">
          Conecte-se para contribuir com um futuro mais sustentável.
        </Text>
        <VStack space="xl">
          <VStack space="xs">
            <Text className="text-typography-500">Email</Text>
            <Input className="min-w-[250px] border border-transparent rounded-md bg-zinc-100 ">
              <InputIcon as={MailIcon} className="ml-2 text-zinc-400" />
              <InputField
                onChangeText={(text: string) => setEmail(text)}
                value={email}
                type="text"
                placeholder="email@exemplo.com"
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Senha</Text>
            <Input className="min-w-[250px] border border-transparent rounded-md bg-zinc-100">
              <InputIcon as={LockIcon} className="ml-2 text-zinc-400" />
              <InputField
                placeholder="Informe sua senha"
                secureTextEntry={true}
                onChangeText={(text: string) => setPassword(text)}
                value={password}
                type={showPassword ? "text" : "password"}
              />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  className="text-zinc-400"
                />
              </InputSlot>
            </Input>
          </VStack>
          <Button
            className="p-0 bg-primary-dark hover:bg-primary-light focus:ring-primary-dark
          flex justify-center items-center border rounded-md border-transparent "
          >
            <ButtonText onPress={login} className="text-white">
              Login
            </ButtonText>
          </Button>
        </VStack>
        <VStack className="flex flex-row justify-center items-center mt-8 ">
          <Text className="text-typography-500">Não tem uma conta?</Text>
          <Button className="m-0 p-2">
            <ButtonText className="text-green-800 font-bold" onPress={register}>
              Cadastre-se
            </ButtonText>
          </Button>
        </VStack>
      </VStack>
    </FormControl>
  );
}

export default App;
