import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Constants from "expo-constants";
import { Address } from "../types";
import RegisteredAddressCard from "./RegisteredAddressCard/RegisterdAddressCard";
import { useCollectFlow } from "@/context/CollectFlowContext";

const RegisteredAddresses = () => {
  const { authState } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { API_URL } = Constants.expoConfig?.extra || {};
  const { previousRegisteredAddressSelectedId, setCollectFlowData } =
    useCollectFlow();

  const handleSelectAddress = (id: string) => {
    setCollectFlowData({ previousRegisteredAddressSelectedId: id });
  };

  console.log("Selected Address ID:", previousRegisteredAddressSelectedId);
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
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
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 6 }}>
      <Text className="text-lg font-bold mb-2">Endereços Cadastrados</Text>
      <Text className="text-sm text-gray-600 mb-4">
        Aqui estão os endereços que você cadastrou.
      </Text>

      {error && <Text className="text-red-500 mb-4">{error}</Text>}

      {loading ? (
        <View className="justify-center items-center my-6">
          <ActivityIndicator size="large" />
        </View>
      ) : addresses.length === 0 ? (
        <Text className="text-gray-500">Nenhum endereço cadastrado ainda.</Text>
      ) : (
        addresses.map((item) => (
          <RegisteredAddressCard
            item={item}
            key={item._id}
            onSelect={handleSelectAddress}
            selected={previousRegisteredAddressSelectedId === item._id}
          />
        ))
      )}
    </ScrollView>
  );
};

export default RegisteredAddresses;
