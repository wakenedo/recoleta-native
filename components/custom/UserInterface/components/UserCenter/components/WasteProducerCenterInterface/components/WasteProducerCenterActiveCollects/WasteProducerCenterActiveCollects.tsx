import React, { FC, useEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import axios from "axios";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext"; // adjust to your context path
import Constants from "expo-constants";

interface WasteProducerCenterActiveCollectsProps {}

interface CollectEvent {
  _id: string;
  eventName: string;
  dateTime: string;
  isSigned: boolean;
}

const WasteProducerCenterActiveCollects: FC<
  WasteProducerCenterActiveCollectsProps
> = () => {
  const { API_URL, TOKEN_KEY } = Constants.expoConfig?.extra || {};
  const { authState } = useAuth();
  const [activeCollects, setActiveCollects] = useState<CollectEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveCollects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/collect-event/user/events`, {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        });

        const now = new Date();

        const filtered = res.data.filter((collect: CollectEvent) => {
          return collect.isSigned && new Date(collect.dateTime) > now;
        });

        setActiveCollects(filtered);
      } catch (err: any) {
        console.error(
          "Erro ao buscar coletas ativas:",
          err?.response?.data || err.message
        );
        setError("Erro ao buscar coletas ativas.");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveCollects();
  }, []);

  if (loading) {
    return (
      <View className="w-full border rounded h-32 items-center justify-center">
        <ActivityIndicator size="small" />
        <Text>Carregando coletas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="w-full border rounded h-32 items-center justify-center">
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View className="mt-2">
      {activeCollects.length > 0 ? (
        <FlatList
          data={activeCollects}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="mb-2 p-3 border rounded bg-white shadow-sm">
              <Text className="font-semibold">{item.eventName}</Text>
              <Text className="text-sm text-gray-600">
                {format(new Date(item.dateTime), "dd/MM/yyyy 'às' HH:mm")}
              </Text>
            </View>
          )}
        />
      ) : (
        <View className="w-full border rounded h-32 items-center justify-center">
          <Text>Não há coletas ativas</Text>
        </View>
      )}
    </View>
  );
};

export default WasteProducerCenterActiveCollects;
