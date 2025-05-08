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
import { CalendarX } from "lucide-react-native";

interface CanceledCollectsProps {
  user: User | null;
  collects: any[];
  loading: boolean;
}

const CanceledCollects: FC<CanceledCollectsProps> = ({
  user,
  collects,
  loading,
}) => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const isProducesWaste = user?.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user?.userType === "COLLECTS_WASTE";

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: expanded ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const containerHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250], // Max height for expanded content
  });

  const iconColor = isProducesWaste
    ? "#dc2626"
    : isCollectsWaste
    ? "#dc2626"
    : "#000000";

  // Render each item in the FlatList
  const renderCollectItem = useCallback(({ item }: any) => {
    console.log("Rendering item:", item.status); // Log the item being rendered
    return <HistoryCollectsCard item={item} />;
  }, []);

  const ITEM_HEIGHT = 100;

  const getItemLayout = (_data: any, index: any) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const canceledCollects = collects.filter(
    (collect) => collect.status === "canceled"
  );
  return (
    <View
      className={`justify-center border-l mx-2 ${
        isProducesWaste && !isCollectsWaste ? "border-l-red-600" : ""
      } ${
        !isProducesWaste && isCollectsWaste ? "border-l-red-600" : ""
      } rounded p-4 bg-white shadow-md mb-4`}
    >
      <Pressable onPress={toggleExpanded}>
        <View className="flex-row items-center justify-between mb-1">
          <View className="flex-row ">
            <View className="mr-1">
              <CalendarX size={22} color={iconColor} />
            </View>

            <Text
              className={`text-xl font-bold  ${
                isProducesWaste && !isCollectsWaste ? "text-red-600" : ""
              } ${!isProducesWaste && isCollectsWaste ? "text-red-600" : ""}`}
            >
              CANCELADAS
            </Text>
          </View>
          <Text className="text-sm text-gray-500">
            {expanded ? "Recolher ▲" : "Expandir ▼"}
          </Text>
        </View>
      </Pressable>

      <Animated.View style={{ overflow: "hidden", height: containerHeight }}>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={iconColor} />
          </View>
        ) : canceledCollects.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <View className="flex-col items-center">
              <CalendarX size={50} color={iconColor} />
              <Text className="text-red-600 mt-2 text-center font-semibold">
                Nenhuma coleta cancelada.
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={canceledCollects}
            renderItem={renderCollectItem}
            keyExtractor={(item) => item._id.toString()}
            getItemLayout={getItemLayout}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
            className="flex-1"
          />
        )}
      </Animated.View>
    </View>
  );
};
export default CanceledCollects;
