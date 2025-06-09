import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useAddress } from "@/hooks/useAddress";
import { Card } from "@/components/ui/card";

import { InterfaceSwitch } from "../InterfaceSwitch";
import AddNewAddress from "./AddNewAddress/AddNewAddress";
import { ChosenResidueCard } from "./AddNewAddress/ChosenResidueCard";
import { RegisteredAddresses } from "./RegisteredAddresses";
import Constants from "expo-constants";
import { Address } from "./types";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useCollectFlow } from "@/context/CollectFlowContext";
import { ChosenResiduesInterface } from "./AddNewAddress/ChosenResiduesInterface";

const AddressInterface: React.FC = ({}) => {
  const [hasRegisteredAddresses, setHasRegisteredAddresses] = useState(false);
  const [toggleDefault, setToggleDefault] = useState(false);
  const { authState } = useAuth();
  const { API_URL } = Constants.expoConfig?.extra || {};
  const { setCollectFlowData, resetAddressData, residues } = useCollectFlow();
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
    setToggleDefault(isToggled); // Update state based on user action

    if (isToggled) {
      setCollectFlowData({ previousRegisteredAddressSelectedId: null });
      resetAddressData();
    }
  };

  return (
    <Card className="space-y-6 border-l rounded-md p-4 bg-white border-orange-300 shadow">
      <View className="mb-4">
        <Text className="text-base font-bold text-orange-600">
          Gerenciamento de Endereços para Coleta
        </Text>
        {hasRegisteredAddresses && (
          <Text className="text-xs text-slate-600">
            Visualize seus endereços cadastrados ou adicione novos endereços
            para coleta
          </Text>
        )}
        {!hasRegisteredAddresses && (
          <Text className="text-xs text-slate-600">
            Adicione novos endereços para coleta
          </Text>
        )}
      </View>
      <View className="mb-2">
        {residues != undefined && residues.length > 0 ? (
          <>
            <Text className=" mb-2 text-base font-bold text-orange-600">
              Residuos a cadastrar
            </Text>
            <ChosenResiduesInterface residues={residues} />
          </>
        ) : (
          <>
            <Text className=" mb-2 text-base font-bold text-orange-600">
              Residuo a cadastrar
            </Text>
            <ChosenResidueCard />
          </>
        )}
      </View>

      {hasRegisteredAddresses && (
        <InterfaceSwitch
          rightLabel="Novo Endereço"
          leftLabel="Endereços Cadastrados"
          value={toggleDefault}
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
      )}
      {!hasRegisteredAddresses && (
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
      )}
    </Card>
  );
};

export default AddressInterface;
