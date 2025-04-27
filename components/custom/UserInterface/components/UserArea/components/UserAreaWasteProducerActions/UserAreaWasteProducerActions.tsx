import { Address } from "@/components/custom/AddressInterface/types";
import { useAuth } from "@/context/AuthContext";
import React, { FC, useState } from "react";
import { View, Button } from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import { WasteProducerUserAddresses } from "./components/WasteProducerUserAddresses";
import { WasteProducerUserResidues } from "./components/WasteProducerUserResidues";
import { WasteProducerUserCollects } from "./components/WasteProducerUserCollects";

interface UserAreaWasteProducerActions {}

const UserAreaWasteProducerActions: FC<UserAreaWasteProducerActions> = () => {
  const { authState } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [residues, setResidues] = useState([]);
  const [collects, setCollects] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [addressesModalVisible, setAddressesModalVisible] =
    useState<boolean>(false);
  const [residuesModalVisible, setResiduesModalVisible] =
    useState<boolean>(false);
  const [collectsModalVisible, setCollectsModalVisible] =
    useState<boolean>(false);
  const { API_URL } = Constants.expoConfig?.extra || {};

  const handleAddressesButton = () => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        setAddressesModalVisible(true); // Show modal while loading
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

  const handleResiduesButton = () => {
    const fetchResidues = async () => {
      try {
        setLoading(true);
        setResiduesModalVisible(true); // Show modal while loading
        const res = await axios.get(`${API_URL}/residues/user`, {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        });
        setResidues(res.data);
      } catch (err: any) {
        console.error(
          "Erro ao buscar resídos:",
          err?.response?.data || err.message
        );
        setError("Erro ao carregar resídos.");
      } finally {
        setLoading(false);
      }
    };

    fetchResidues();
  };
  const handleCollectsButton = () => {
    const fetchCollects = async () => {
      try {
        setLoading(true);
        setCollectsModalVisible(true); // Show modal while loading
        const res = await axios.get(`${API_URL}/collect-event/user/events`, {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        });
        setCollects(res.data);
      } catch (err: any) {
        console.error(
          "Erro ao buscar coletas:",
          err?.response?.data || err.message
        );
        setError("Erro ao carregar coletas.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollects();
  };

  console.log("addresses:", addresses);
  console.log("residues:", residues);
  console.log("collects:", collects);

  return (
    <View>
      <View className="mb-2">
        <Button title="Endereços" onPress={handleAddressesButton} />
      </View>
      <View className="mb-2">
        <Button title="Residuos" onPress={handleResiduesButton} />
      </View>
      <View className="mb-2">
        <Button title="Coletas" onPress={handleCollectsButton} />
      </View>

      <WasteProducerUserAddresses
        error={error}
        addresses={addresses}
        visible={addressesModalVisible}
        loading={loading}
        onClose={() => setAddressesModalVisible(false)}
      />
      <WasteProducerUserResidues
        error={error}
        residues={residues}
        visible={residuesModalVisible}
        loading={loading}
        onClose={() => setResiduesModalVisible(false)}
      />

      <WasteProducerUserCollects
        error={error}
        collects={collects}
        visible={collectsModalVisible}
        loading={loading}
        onClose={() => setCollectsModalVisible(false)}
      />
    </View>
  );
};
export default UserAreaWasteProducerActions;
