import { User } from "@/app/Home";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { HistoryCollectsCard } from "../HistoryCollectsCard";
import { AlarmClock, CalendarClock } from "lucide-react-native";

interface ExpiredCollectsProps {
  user: User | null;
  collects: any[];
  loading: boolean;
}

const ExpiredCollects: FC<ExpiredCollectsProps> = ({
  user,
  collects,
  loading,
}) => {
  const [expanded, setExpanded] = useState(false);
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const iconColor = "#eab308";

  const renderCollectItem = useCallback(({ item }: any) => {
    return <HistoryCollectsCard item={item} />;
  }, []);

  const ITEM_HEIGHT = 100;
  const getItemLayout = (_data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const expiredCollects = collects.filter(
    (collect) => collect.status === "expired"
  );

  return (
    <View className="justify-center border-l mx-2 border-l-yellow-500 rounded p-4 bg-white shadow-md mb-4">
      <Pressable onPress={toggleExpanded}>
        <View className="flex-row items-center justify-between mb-1">
          <View className="flex-row">
            <View className="mr-1">
              <CalendarClock size={22} color={iconColor} />
            </View>

            <Text className="text-xl font-bold text-yellow-500">EXPIRADAS</Text>
          </View>
          <Text className="text-sm text-gray-500">
            {expanded ? "Recolher ▲" : "Expandir ▼"}
          </Text>
        </View>
      </Pressable>

      <Animated.View style={{ overflow: "hidden" }}>
        {loading ? (
          <View className="flex-1 justify-center items-center ">
            <ActivityIndicator size="large" color={iconColor} />
          </View>
        ) : expiredCollects.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <View className="flex-col items-center">
              <AlarmClock size={50} color={iconColor} />
              <Text className="text-yellow-500 mt-2 text-center font-semibold">
                Nenhuma coleta expirada ainda.
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={expiredCollects}
            renderItem={renderCollectItem}
            keyExtractor={(item) => item._id.toString()}
            getItemLayout={getItemLayout}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false} // Let parent scroll instead
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default ExpiredCollects;
