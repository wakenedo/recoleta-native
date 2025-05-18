import { User } from "@/app/Home";
import { Calendar1, CalendarClock } from "lucide-react-native";
import React, { FC, useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { HistoryCollectsCard } from "../HistoryCollectsCard";

interface ScheduledCollectsProps {
  user: User | null;
  collects: any[];
  loading: boolean;
}

const ScheduledCollects: FC<ScheduledCollectsProps> = ({
  user,
  collects,
  loading,
}) => {
  const [expanded, setExpanded] = useState(false);
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const isProducesWaste = user?.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user?.userType === "COLLECTS_WASTE";

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

  const iconColor = isProducesWaste
    ? "#c2410c"
    : isCollectsWaste
    ? "#15803d"
    : "#000000";

  const renderCollectItem = useCallback(({ item }: any) => {
    return <HistoryCollectsCard item={item} />;
  }, []);

  const ITEM_HEIGHT = 100;
  const getItemLayout = (_data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const scheduledCollects = collects.filter(
    (collect) => collect.status === "scheduled"
  );

  return (
    <View
      className={`justify-center border-l mx-2 ${
        isProducesWaste && !isCollectsWaste ? "border-l-orange-300" : ""
      } ${
        !isProducesWaste && isCollectsWaste ? "border-l-green-300" : ""
      } rounded p-4 bg-white shadow-md mb-4`}
    >
      <Pressable onPress={toggleExpanded}>
        <View className="flex-row items-center justify-between mb-1">
          <View className="flex-row">
            <View className="mr-1">
              <Calendar1 size={22} color={iconColor} />
            </View>

            <Text
              className={`text-xl font-bold  ${
                isProducesWaste && !isCollectsWaste ? "text-orange-700" : ""
              } ${!isProducesWaste && isCollectsWaste ? "text-green-700" : ""}`}
            >
              AGENDADAS
            </Text>
          </View>
          <Text className="text-sm text-gray-500">
            {expanded ? "Recolher ▲" : "Expandir ▼"}
          </Text>
        </View>
      </Pressable>

      {expanded && (
        <Animated.View style={{ opacity: animatedOpacity }}>
          {loading ? (
            <View className="flex justify-center items-center my-4">
              <ActivityIndicator size="large" color="#4B9CD3" />
            </View>
          ) : scheduledCollects.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <View className="flex-col items-center">
                <CalendarClock size={50} color={iconColor} />
                <Text
                  className={`${
                    isProducesWaste && !isCollectsWaste ? "text-orange-700" : ""
                  } ${
                    !isProducesWaste && isCollectsWaste ? "text-green-700" : ""
                  } mt-2 text-center font-semibold`}
                >
                  Nenhuma coleta agendada ainda.
                </Text>
              </View>
            </View>
          ) : (
            <FlatList
              data={scheduledCollects}
              renderItem={renderCollectItem}
              keyExtractor={(item) => item._id.toString()}
              getItemLayout={getItemLayout}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false} // Let parent scroll instead
              contentContainerStyle={{ paddingBottom: 10 }}
            />
          )}
        </Animated.View>
      )}
    </View>
  );
};

export default ScheduledCollects;
