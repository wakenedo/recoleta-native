import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useAddress } from "@/hooks/useAddress";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { InterfaceSwitch } from "../InterfaceSwitch";
import AddNewAddress from "./AddNewAddress/AddNewAddress";
import { ChosenResidueCard } from "./AddNewAddress/ChosenResidueCard";
import { RegisteredAddresses } from "./RegisteredAddresses";
import Constants from "expo-constants";
import { Address } from "./types";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useCollectFlow } from "@/context/CollectFlowContext";

const AddressInterface: React.FC = ({}) => {
  const [hasRegisteredAddresses, setHasRegisteredAddresses] = useState(false);
  const [toggleDefault, setToggleDefault] = useState(false);
  const { authState } = useAuth();
  const { API_URL } = Constants.expoConfig?.extra || {};
  const { setCollectFlowData, resetAddressData } = useCollectFlow();
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

  useEffect(() => {
    const checkUserAddresses = async () => {
      try {
        const res = await axios.get<Address[]>(`${API_URL}/address/user`, {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        });
        if (res.data.length > 0) {
          setHasRegisteredAddresses(!hasRegisteredAddresses);
          setToggleDefault(hasRegisteredAddresses); // start on left (registered addresses)
        } else {
          setHasRegisteredAddresses(hasRegisteredAddresses);
          setToggleDefault(!hasRegisteredAddresses); // no addresses, start on right (add new)
        }
      } catch (error) {
        console.error("Erro ao verificar endereços:", error);
      }
    };

    checkUserAddresses();
  }, []);

  const handleSwitchChange = (isToggled: boolean) => {
    if (isToggled) {
      // switched to "Novo Endereço"
      setCollectFlowData({ previousRegisteredAddressSelectedId: null });
      resetAddressData();
    }
  };

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
        defaultValue={toggleDefault}
        onToggleChange={handleSwitchChange}
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
