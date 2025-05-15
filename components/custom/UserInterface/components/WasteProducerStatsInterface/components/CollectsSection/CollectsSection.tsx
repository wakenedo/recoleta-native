import React, { FC, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  ActivityIndicator,
  Switch,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { ArchiveIcon } from "lucide-react-native";
import { User } from "@/app/Home";

export interface CollectStats {
  status: string;
  count: number;
  avgQuantity: number;
  successRate: number;
  expiredRate: number;
  canceledRate: number;
  scheduled: number;
  completed: number;
}

interface CollectsSectionProps {
  user: User | null;
  loading: boolean;
  collectStats: CollectStats[];
}

const CollectsSection: FC<CollectsSectionProps> = ({
  user,
  loading,
  collectStats,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [useQuantity, setUseQuantity] = useState(true);
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const isProducesWaste = user?.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user?.userType === "COLLECTS_WASTE";

  const iconColor = isProducesWaste
    ? "#c2410c"
    : isCollectsWaste
    ? "#15803d"
    : "#000000";
  const mainColor = isProducesWaste ? "#c2410c" : "#15803d";
  const gradientColor = isProducesWaste ? "#fa954d" : "#4ade80";

  const toggleExpanded = () => setExpanded((prev) => !prev);

  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const chartDataBar = collectStats.map((stat) => ({
    label: stat.status,
    value: useQuantity ? stat.avgQuantity : stat.count,
    frontColor: mainColor,
    gradientColor,
    showGradient: true,
    topLabelComponent: () => (
      <Text style={{ fontSize: 10, color: "#444", marginBottom: 4 }}>
        {useQuantity ? `${stat.avgQuantity.toFixed(1)}kg` : `${stat.count}x`}
      </Text>
    ),
  }));

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
            className={`text-xl font-bold ${
              isProducesWaste && !isCollectsWaste ? "text-orange-700" : ""
            } ${!isProducesWaste && isCollectsWaste ? "text-green-700" : ""}`}
          >
            COLETAS
          </Text>
        </View>
      </View>

      <View className="flex flex-col bg-slate-50 shadow-lg items-center justify-center rounded p-2 mt-2">
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : chartDataBar.length === 0 ? (
          <Text className="text-sm text-gray-500">Sem dados disponíveis</Text>
        ) : (
          <>
            <Text className="text-sm font-medium text-gray-600 mb-2">
              Exibindo:{" "}
              {useQuantity ? "Média por coleta (kg)" : "Número de coletas"}
            </Text>
            <View className="flex-row items-center mb-2">
              <Text className="text-xs mr-2">Mostrar:</Text>
              <Text className="text-xs mr-1">Contagem</Text>
              <Switch value={useQuantity} onValueChange={setUseQuantity} />
              <Text className="text-xs ml-1">Quantidade</Text>
            </View>
            <BarChart
              barWidth={30}
              width={280}
              barBorderRadius={4}
              noOfSections={6}
              xAxisLabelsVerticalShift={-2}
              yAxisLabelSuffix={useQuantity ? " Kg" : " x"}
              yAxisLabelContainerStyle={{ marginRight: 5 }}
              yAxisTextStyle={{ fontSize: 10 }}
              xAxisLabelTextStyle={{ fontSize: 10 }}
              maxValue={Math.max(...chartDataBar.map((d) => d.value), 0) + 50}
              data={chartDataBar}
              yAxisThickness={0.5}
              xAxisThickness={0.5}
              isAnimated
            />
          </>
        )}
      </View>

      <View className="flex flex-end mt-2 justify-between items-end">
        <Pressable onPress={toggleExpanded}>
          <View className="flex-row items-center mt-2">
            <Text className="text-xs">Detalhes</Text>
            <Text className="text-sm text-gray-500">
              {expanded ? "▲" : "▼"}
            </Text>
          </View>
        </Pressable>
      </View>

      {expanded && (
        <Animated.View style={{ opacity: animatedOpacity }}>
          <View className="mt-2">
            <Text className="text-xs text-gray-500">
              Coletas bem-sucedidas, expiradas e canceladas são exibidas por
              status.
            </Text>
            <Text className="text-xs text-gray-500 mt-1">
              Dados representam a média de quantidade por coleta ou número
              total.
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default CollectsSection;
