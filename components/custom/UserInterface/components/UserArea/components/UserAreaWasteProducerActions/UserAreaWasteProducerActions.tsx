import React, { FC, useState } from "react";
import { View, Button } from "react-native";
import { WasteProducerUserAddresses } from "./components/WasteProducerUserAddresses";
import { WasteProducerUserResidues } from "./components/WasteProducerUserResidues";
import { WasteProducerUserCollects } from "./components/WasteProducerUserCollects";
import { useWasteProducer } from "@/context/WasteProducerContext";

interface UserAreaWasteProducerActions {}

const UserAreaWasteProducerActions: FC<UserAreaWasteProducerActions> = () => {
  const {
    addresses,
    residues,
    collects,
    loading,
    error,
    fetchAddresses,
    fetchResidues,
    fetchCollects,
    resetError,
  } = useWasteProducer();

  const [addressesModalVisible, setAddressesModalVisible] =
    useState<boolean>(false);
  const [residuesModalVisible, setResiduesModalVisible] =
    useState<boolean>(false);
  const [collectsModalVisible, setCollectsModalVisible] =
    useState<boolean>(false);

  const handleAddressesButton = async () => {
    resetError();
    setAddressesModalVisible(true);
    await fetchAddresses();
  };

  const handleResiduesButton = async () => {
    resetError();
    setResiduesModalVisible(true);
    await fetchResidues();
  };

  const handleCollectsButton = async () => {
    resetError();
    setCollectsModalVisible(true);
    await fetchCollects();
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
