import { User } from "@/app/Home";
import { ArchiveIcon } from "lucide-react-native";
import React, { FC, useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";

interface CollectsSectionProps {
  user: User | null;
  collects: any[];
  loading: boolean;
}
const CollectsSection: FC<CollectsSectionProps> = ({
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
  return (
    <View
      className={`justify-center border-l mx-2 ${
        isProducesWaste && !isCollectsWaste ? "border-l-orange-300" : ""
      } ${
        !isProducesWaste && isCollectsWaste ? "border-l-green-300" : ""
      } rounded p-4 bg-white shadow-md mb-4`}
    >
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center">
          <View className="mr-1">
            <ArchiveIcon size={26} color={iconColor} />
          </View>

          <Text
            className={`text-xl font-bold  ${
              isProducesWaste && !isCollectsWaste ? "text-orange-700" : ""
            } ${!isProducesWaste && isCollectsWaste ? "text-green-700" : ""}`}
          >
            COLETAS
          </Text>
        </View>
      </View>
      <View className="flex flex-col  bg-slate-50 shadow-lg items-center justify-center rounded p-2 h-72 mt-2">
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text className="text-sm text-gray-500">Here go Collects Graphs</Text>
        )}
      </View>
      <View className="flex flex-end mt-2 justify-between items-end">
        <Pressable onPress={toggleExpanded}>
          <View className="flex-row items-center mt-2">
            <Text className="text-xs">Filtros</Text>
            <Text className="text-sm text-gray-500">
              {expanded ? "▲" : "▼"}
            </Text>
          </View>
        </Pressable>
      </View>
      {expanded && (
        <Animated.View style={{ opacity: animatedOpacity }}>
          <View>
            <Text>Filter Options</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};
export default CollectsSection;
