import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { AddNewAddressForm } from "./components/AddNewAddressForm";
import { AddNewAddressViaGPS } from "./components/AddNewAddressViaGPS";

export interface AddNewAddressProps {
  latitude?: number | string;
  longitude?: number | string;
  postalCode: string;
  number: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  setLatitude?: (value: number) => void;
  setLongitude?: (value: number) => void;
  setPostalCode: (value: string) => void;
  setNumber: (value: string) => void;
  setStreet: (value: string) => void;
  setComplement: (value: string) => void;
  setNeighborhood: (value: string) => void;
  setCity: (value: string) => void;
  setState: (value: string) => void;
}

const AddNewAddress: FC<AddNewAddressProps> = ({
  latitude,
  longitude,
  postalCode,
  number,
  street,
  complement,
  neighborhood,
  city,
  state,
  setLatitude,
  setLongitude,
  setPostalCode,
  setNumber,
  setStreet,
  setComplement,
  setNeighborhood,
  setCity,
  setState,
}) => {
  return (
    <View style={styles.container}>
      <AddNewAddressForm
        postalCode={postalCode}
        number={number}
        street={street}
        complement={complement}
        neighborhood={neighborhood}
        city={city}
        state={state}
        setPostalCode={setPostalCode}
        setNumber={setNumber}
        setStreet={setStreet}
        setComplement={setComplement}
        setNeighborhood={setNeighborhood}
        setCity={setCity}
        setState={setState}
      />
      <AddNewAddressViaGPS />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});
export default AddNewAddress;
