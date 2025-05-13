import { User } from "@/app/Home";
import React, { FC, useRef, useState } from "react";
import { View, Text, Alert, TextInput, Button } from "react-native";
import { CPF, CNPJ } from "@brasil-interface/utils";
import PhoneInput from "react-native-phone-number-input";
import { CheckCircle } from "lucide-react-native";

interface AddPersonalInfoProps {
  updateUser: (data: Partial<User>) => Promise<void>;
  user: User | null;
}

const AddPersonalInfo: FC<AddPersonalInfoProps> = ({ updateUser, user }) => {
  const phoneInputRef = useRef<PhoneInput>(null);

  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);

  console.log("user ", user);

  const handleSave = async () => {
    if (!isValidPhone) {
      Alert.alert("Telefone inválido", "Digite um telefone válido.");
      return;
    }

    const cleanedDoc = document.replace(/\D/g, "");

    const isValidCPF = CPF.isValid(cleanedDoc);
    const isValidCNPJ = CNPJ.isValid(cleanedDoc);

    if (!isValidCPF && !isValidCNPJ) {
      Alert.alert("Documento inválido", "Digite um CPF ou CNPJ válido.");
      return;
    }

    const formattedDoc = isValidCPF
      ? CPF.mask(cleanedDoc)
      : CNPJ.mask(cleanedDoc);

    try {
      await updateUser({ phone, document: formattedDoc });
      setIsSubmitted(true);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar perfil.");
    }
  };

  return (
    <View className="w-full mb-2 justify-center  bg-white py-6 px-4">
      <Text className="text-lg font-semibold mb-4 text-slate-800 uppercase ">
        Informações Pessoais
      </Text>
      {isSubmitted || (user?.document && user?.phone) ? (
        <View className="flex items-center mt-4">
          <CheckCircle size={56} color="#166534" />
          <Text className="my-4 text-green-800 font-semibold">
            Informações salvas com sucesso!
          </Text>
        </View>
      ) : (
        <View className="px-3">
          <View>
            <Text className="text-slate-600 mb-4 text-center">
              Complete seu perfil para uma experiência personalizada.
            </Text>

            <Text className="text-slate-700 mb-1">Telefone:</Text>
            <PhoneInput
              ref={phoneInputRef}
              value={phone}
              layout="first"
              defaultCode="BR"
              countryPickerProps={{
                withAlphaFilter: true,
                withEmoji: true,
                withFlag: true,
              }}
              onChangeFormattedText={(text) => {
                setPhone(text);
                const isValid = phoneInputRef.current?.isValidNumber(text);
                setIsValidPhone(!!isValid);
              }}
              withShadow
              textContainerStyle={{ paddingVertical: 0 }}
              containerStyle={{ marginBottom: 12 }}
              textInputProps={{ keyboardType: "phone-pad" }}
            />

            <Text className="text-gray-700 mb-1">Documento (CPF/CNPJ):</Text>
            <TextInput
              className="border border-gray-300 p-2 rounded mt-2"
              placeholder="Digite seu CPF ou CNPJ"
              value={document}
              onChangeText={setDocument}
              keyboardType="number-pad"
            />
            <Text className="text-gray-600 my-2 text-xs">
              * CPF ou CNPJ é necessário para verificar sua identidade.
            </Text>
            <Button title="Salvar Informações" onPress={handleSave} />
            <View className="flex-row items-center">
              <Text className="text-xs text-gray-600 text-center mt-2">
                Por que precisamos desses dados ? Isso nos ajuda a entender suas
                necessidades e oferecer um serviço mais seguro e transparente.
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
export default AddPersonalInfo;
