import React from "react";
import { View, Text } from "react-native";
const AddNewAddressViaGPS = () => {
  return (
    <View>
      <Text className="text-md font-bold mb-2">Usar localização atual</Text>
      <Text>
        Aqui vai o componente e lógica de utilizar modulo nativo localização.
      </Text>
      {/* Aqui você pode adicionar a lógica para capturar a localização do usuário */}
      {/* e preencher os campos de endereço automaticamente */}
    </View>
  );
};
export default AddNewAddressViaGPS;
