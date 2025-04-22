import { Address } from "@/components/custom/AddressInterface/types";
import { useAuth } from "@/context/AuthContext";
import React, { FC, useEffect, useState } from "react";
import { View, Button } from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import { WasteCollectorUserAddress } from "./components/WasteCollectorUserAddresses";

interface UserAreaWasteProducerActions {}

const UserAreaWasteProducerActions: FC<UserAreaWasteProducerActions> = () => {
  const { authState } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { API_URL } = Constants.expoConfig?.extra || {};

  const handleAddressesButton = () => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        setModalVisible(true); // Show modal while loading
        const res = await axios.get<Address[]>(`${API_URL}/address/user`, {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        });
        setAddresses(res.data);
      } catch (err: any) {
        console.error(
          "Erro ao buscar endereços:",
          err?.response?.data || err.message
        );
        setError("Erro ao carregar endereços.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  };

  console.log("addresses:", addresses);

  return (
    <View>
      <View className="mb-2">
        <Button title="Endereços" onPress={handleAddressesButton} />
      </View>
      <View className="mb-2">
        <Button
          title="Residos"
          onPress={() => console.log("Residos Registrados Clicado")}
        />
      </View>
      <View className="mb-2">
        <Button
          title="Coletas"
          onPress={() => console.log("Suas Coletas Clicado")}
        />
      </View>

      <WasteCollectorUserAddress
        error={error}
        addresses={addresses}
        visible={modalVisible}
        loading={loading}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};
export default UserAreaWasteProducerActions;
