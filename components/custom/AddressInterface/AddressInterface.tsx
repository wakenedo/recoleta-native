import React from "react";
import { View } from "react-native";
import { useAddress } from "@/hooks/useAddress";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { InterfaceSwitch } from "../InterfaceSwitch";
import AddNewAddress from "./AddNewAddress/AddNewAddress";
import { ChosenResidueCard } from "./AddNewAddress/ChosenResidueCard";
import RegisteredAddresses from "./RegisteredAddresses/RegisteredAdresses";

interface AddressInterfaceProps {}

const AddressInterface: React.FC<AddressInterfaceProps> = ({}) => {
  const {
    latitude,
    longitude,
    neighborhood,
    state,
    street,
    number,
    complement,
    city,
    postalCode,
    setLatitude,
    setLongitude,
    setNeighborhood,
    setState,
    setStreet,
    setNumber,
    setComplement,
    setCity,
    setPostalCode,
  } = useAddress();

  return (
    <Card className="border border-zinc-300">
      <View className="mb-6">
        <Heading size="xs">Gerenciamento de Endereços para Coleta</Heading>
        <Text size="xs" className="mt-2">
          Visualize seus endereços cadastrados e adicione novos endereços para
          coleta
        </Text>
      </View>
      <View>
        <Heading className="mb-2" size="xs">
          Resido a cadastrar:
        </Heading>
        <ChosenResidueCard />
      </View>

      <InterfaceSwitch
        rightLabel="Novo Endereço"
        leftLabel="Endereços Cadastrados"
        defaultValue={true}
        leftComponent={<RegisteredAddresses />}
        rightComponent={
          <AddNewAddress
            latitude={latitude}
            longitude={longitude}
            neighborhood={neighborhood}
            state={state}
            street={street}
            number={number}
            complement={complement}
            city={city}
            postalCode={postalCode}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            setNeighborhood={setNeighborhood}
            setState={setState}
            setStreet={setStreet}
            setNumber={setNumber}
            setComplement={setComplement}
            setCity={setCity}
            setPostalCode={setPostalCode}
          />
        }
      />
    </Card>
  );
};

export default AddressInterface;
