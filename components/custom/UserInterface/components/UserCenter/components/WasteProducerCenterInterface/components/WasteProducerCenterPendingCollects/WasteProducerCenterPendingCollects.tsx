import React from "react";
import { Text, View } from "react-native";

const WasteProducerCenterPendingCollects = () => {
  return (
    <View>
      <View>
        <Text className="text-lg font-bold">Coletas Pendentes</Text>
      </View>
      <View className="w-full border rounded my-2 h-48 items-center justify-center">
        <Text>Logíca para receber as coletas pendentes</Text>
      </View>
    </View>
  );
};
export default WasteProducerCenterPendingCollects;
