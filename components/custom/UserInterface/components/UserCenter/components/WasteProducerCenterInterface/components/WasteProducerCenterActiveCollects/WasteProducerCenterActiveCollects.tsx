import React, { FC } from "react";
import { Text, View } from "react-native";

interface WasteProducerCenterActiveCollectsProps {
  hasCollects: boolean;
}

const WasteProducerCenterActiveCollects: FC<
  WasteProducerCenterActiveCollectsProps
> = ({ hasCollects }) => {
  return (
    <View className="mt-2">
      {hasCollects ? (
        <View className="w-full border rounded  h-32 items-center justify-center">
          <Text>Logíca para receber as coletas ativas (assinadas)</Text>
        </View>
      ) : (
        <View className="w-full border rounded  h-32 items-center justify-center">
          <Text>Não há coletas ativas (assinadas)</Text>
        </View>
      )}
    </View>
  );
};
export default WasteProducerCenterActiveCollects;
