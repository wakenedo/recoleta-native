import React from "react";
import { usePriceTable } from "@/hooks/usePriceTable";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { RegionPriceTableProps } from "@/components/types";

export const RegionPriceTable: React.FC<RegionPriceTableProps> = ({
  token,
  region,
}) => {
  const { error, loading, priceTable } = usePriceTable(token ?? "", region);

  if (loading) {
    return (
      <View className="items-center justify-center h-48">
        <ActivityIndicator size="large" />
        <Text className="mt-2">Carregando tabela de preços...</Text>
      </View>
    );
  }

  if (error || !priceTable) {
    return (
      <View className="p-4">
        <Text className="text-red-500 font-semibold">
          {error
            ? `Erro: ${error.message}`
            : "Tabela de preços não encontrada."}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-4">
      {Object.entries(priceTable).map(([category, { variants }]) => (
        <View key={category} className="mb-6">
          <Text className="text-lg font-bold mb-2">{category}</Text>
          {variants.map((v, idx) => (
            <View key={idx} className="mb-2 p-2 border border-zinc-300 rounded">
              <Text className="font-semibold">{v.label}</Text>
              <Text>Preço/kg: R$ {v.pricePerKg.toFixed(2)}</Text>
              <Text>Peso mínimo: {v.minWeightKg}kg</Text>
              <Text>Comissão (30%): R$ {v.commission30Percent.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default RegionPriceTable;
