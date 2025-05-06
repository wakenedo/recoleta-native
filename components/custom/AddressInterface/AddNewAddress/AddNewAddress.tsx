import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { AddNewAddressForm } from "./components/AddNewAddressForm";
import { AddNewAddressViaGPS } from "./components/AddNewAddressViaGPS";
import { AddNewAddressProps } from "../types";

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
    paddingVertical: 8,
    paddingHorizontal: 2,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});
export default AddNewAddress;
