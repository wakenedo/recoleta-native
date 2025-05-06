import { HistoryIcon } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const WasteProducerHistoryInterface = () => {
  return (
    <View className="flex-1 ">
      <View className="">
        <View className="flex-row items-center justify-start px-1">
          <View className="mr-2">
            <HistoryIcon size={32} color="#000" />
          </View>
          <View className="mt-2">
            <Text className="text-left text-2xl font-bold  ">Hístórico</Text>
          </View>
        </View>
        <View className="px-2 my-2">
          <Text className="text-left text-sm font-bold">
            Visualize seu histórico de coletas, completas, expiradas ou
            canceladas.
          </Text>
        </View>
      </View>
    </View>
  );
};
export default WasteProducerHistoryInterface;
