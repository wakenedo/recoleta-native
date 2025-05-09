import React, { FC, useState } from "react";
import { View, Button } from "react-native";
import { WasteProducerUserAddresses } from "./components/WasteProducerUserAddresses";
import { WasteProducerUserResidues } from "./components/WasteProducerUserResidues";
//import { WasteProducerUserCollects } from "./components/WasteProducerUserCollects";
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
  {
    /*const [collectsModalVisible, setCollectsModalVisible] =
    useState<boolean>(false);*/
  }

  const handleAddressesButton = async () => {
    resetError();
    setAddressesModalVisible(true);
    await fetchAddresses();
  };

  // Quando a StatsScreen for implementada, podemos remover essa lógica de busca de residuos
  // e deixar apenas a lógica de busca de residuos, pois a StatsScreen já vai utilizar essas informações além do resto das informaçoes da conta
  // com todas as informações vamos poder gerar graficos e estatisticas de residuos, coletas e endereços para o usuario

  const handleResiduesButton = async () => {
    resetError();
    setResiduesModalVisible(true);
    await fetchResidues();
  };

  // Como já temos o HistoryScreen implantado, não precisamos mais do botão de coletas, nem da lógica
  // para buscar coletas integralmente, pois o HistoryScreen já faz as separações esperadas de eventos a partir do status
  // caso não seja implementado a interface de admin acho que podemos remover e esquecer toda a lógica de coletas aqui.

  {
    /*const handleCollectsButton = async () => {
    resetError();
    setCollectsModalVisible(true);
    await fetchCollects();
  };*/
  }

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
      {/*<View className="mb-2">
        <Button title="Coletas" onPress={handleCollectsButton} />
      </View>
      */}
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

      {/* <WasteProducerUserCollects
        error={error}
        collects={collects}
        visible={collectsModalVisible}
        loading={loading}
        onClose={() => setCollectsModalVisible(false)}
      />*/}
    </View>
  );
};
export default UserAreaWasteProducerActions;
