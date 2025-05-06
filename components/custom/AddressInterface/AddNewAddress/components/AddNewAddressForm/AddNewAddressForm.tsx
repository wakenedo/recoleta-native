import React, { FC } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { AddNewAddressFormProps } from "../../../types";
import {
  Building2,
  Hash,
  HouseIcon,
  MapPinHouseIcon,
  MapPinned,
  MapPinPlus,
  PinIcon,
} from "lucide-react-native";

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
  // We will need to implement some logic to use the postalCode and get latitude and longitude using an API
  // When we have the latitude and longitude, we can save along with the address every time the user adds a new address
  // This will be useful for the map and for the delivery person to find the address
  // const { setLatitude, setLongitude } = useAddress();
  return (
    <View className="">
      <View className="flex-row gap-x-4 ">
        <View className="flex-1">
          <Text className="text-md font-bold mb-2 text-slate-800">CEP</Text>
          <View style={styles.container}>
            <View style={styles.inputWrapper}>
              <PinIcon size={18} color="#9CA3AF" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="00000-000"
                value={postalCode}
                onChangeText={setPostalCode}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        <View className="flex-1">
          <Text className="text-md font-bold mb-2 text-slate-800">Número</Text>
          <View style={styles.container}>
            <View style={styles.inputWrapper}>
              <Hash size={18} color="#9CA3AF" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="123"
                value={number}
                onChangeText={setNumber}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-col">
        <View className="mb-2">
          <Text className="text-md font-bold text-slate-800">
            Rua/Logradouro
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <HouseIcon size={18} color="#9CA3AF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Rua"
              value={street}
              onChangeText={setStreet}
            />
          </View>
        </View>
      </View>
      <View className="flex flex-col">
        <View className="mb-2">
          <Text className="text-md font-bold text-slate-800">Complemento</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <MapPinPlus size={18} color="#9CA3AF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Complemento"
              value={complement}
              onChangeText={setComplement}
            />
          </View>
        </View>
      </View>

      <View className="flex flex-col">
        <View className="mb-2">
          <Text className="text-md font-bold text-slate-800">Bairro</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <MapPinHouseIcon size={18} color="#9CA3AF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Bairro"
              value={neighborhood}
              onChangeText={setNeighborhood}
            />
          </View>
        </View>
      </View>
      <View className="flex-row gap-x-4">
        <View className="flex-1">
          <Text className="text-md font-bold mb-2 text-slate-800">Cidade</Text>
          <View style={styles.container}>
            <View style={styles.inputWrapper}>
              <Building2 size={18} color="#9CA3AF" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Cidade"
                value={city}
                onChangeText={setCity}
              />
            </View>
          </View>
        </View>

        <View className="flex-1">
          <Text className="text-md font-bold mb-2 text-slate-800">Estado</Text>
          <View style={styles.container}>
            <View style={styles.inputWrapper}>
              <MapPinned size={18} color="#9CA3AF" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Estado"
                value={state}
                onChangeText={setState}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F3F4F6", // light gray background
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  icon: {
    marginRight: 4,
  },
  input: {
    fontSize: 13,
    color: "#111827",
  },
});
export default AddNewAddressForm;
