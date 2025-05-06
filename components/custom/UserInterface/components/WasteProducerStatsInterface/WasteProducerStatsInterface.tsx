import { ChartColumn } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const WasteProducerStatsInterface = () => {
  return (
    <View className="flex-1 ">
      <View className="">
        <View className="flex-row items-center justify-start px-1">
          <View className="mr-2">
            <ChartColumn size={32} color="#000" />
          </View>
          <View className="mt-2">
            <Text className="text-left text-2xl font-bold  ">Estatísticas</Text>
          </View>
        </View>
        <View className="px-2 my-2">
          <Text className="text-left text-sm font-bold">
            Visualize suas estátisticas como coletor de resíduos, coletas
            completas, quantidade de residuos reciclados e mais.
          </Text>
        </View>
      </View>
    </View>
  );
};
export default WasteProducerStatsInterface;
