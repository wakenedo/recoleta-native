import React, { FC } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface AddNewAddressFormProps {
  postalCode: string;
  number: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  setPostalCode: (value: string) => void;
  setNumber: (value: string) => void;
  setStreet: (value: string) => void;
  setComplement: (value: string) => void;
  setNeighborhood: (value: string) => void;
  setCity: (value: string) => void;
  setState: (value: string) => void;
}

const AddNewAddressForm: FC<AddNewAddressFormProps> = ({
  postalCode,
  number,
  street,
  complement,
  neighborhood,
  city,
  state,
  setPostalCode,
  setNumber,
  setStreet,
  setComplement,
  setNeighborhood,
  setCity,
  setState,
}) => {
  return (
    <View className="w-full ">
      <View className="flex-row gap-x-4 ">
        <View className="flex-1">
          <Text className="text-md font-bold mb-2">CEP</Text>
          <TextInput
            style={styles.input}
            placeholder="00000-000"
            value={postalCode}
            onChangeText={setPostalCode}
            keyboardType="numeric"
          />
        </View>

        <View className="flex-1">
          <Text className="text-md font-bold mb-2">Número</Text>
          <TextInput
            style={styles.input}
            placeholder="123"
            value={number}
            onChangeText={setNumber}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View className="flex flex-col">
        <View className="mb-2">
          <Text className="text-md font-bold">Rua/Logradouro</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Rua"
          value={street}
          onChangeText={setStreet}
        />
      </View>
      <View className="flex flex-col">
        <View className="mb-2">
          <Text className="text-md font-bold">Complemento</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Complemento"
          value={complement}
          onChangeText={setComplement}
        />
      </View>

      <View className="flex flex-col">
        <View className="mb-2">
          <Text className="text-md font-bold">Bairro</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          value={neighborhood}
          onChangeText={setNeighborhood}
        />
      </View>
      <View className="flex-row gap-x-4">
        <View className="flex-1">
          <Text className="text-md font-bold mb-2">Cidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={city}
            onChangeText={setCity}
          />
        </View>

        <View className="flex-1">
          <Text className="text-md font-bold mb-2">Estado</Text>
          <TextInput
            style={styles.input}
            placeholder="Estado"
            value={state}
            onChangeText={setState}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
  },
});
export default AddNewAddressForm;
