import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";

type Variant = {
  label: string;
  pricePerKg: number;
  minWeightKg: number;
  commission30Percent: number;
};

type PriceTable = {
  [category: string]: {
    variants: Variant[];
  };
};

type RegionPriceTableProps = {
  token: string | undefined | null;
  region: string;
};

export const RegionPriceTable: React.FC<RegionPriceTableProps> = ({
  token,
  region,
}) => {
  const [data, setData] = useState<PriceTable | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPriceTable = async () => {
      try {
        const res = await fetch(
          `http://192.168.96.2:5000/api/price-tables/${region}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetching price table for region:", region);
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error("Erro ao carregar tabela de preço.");
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchPriceTable();
  }, [token, region]);

  console.log("Price table data:", data);
  if (loading) {
    return (
      <View className="items-center justify-center h-48">
        <ActivityIndicator size="large" />
        <Text className="mt-2">Carregando tabela de preços...</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View className="p-4">
        <Text className="text-red-500 font-semibold">
          {error || "Não foi possível carregar os dados."}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-4">
      {Object.entries(data).map(([category, { variants }]) => (
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
