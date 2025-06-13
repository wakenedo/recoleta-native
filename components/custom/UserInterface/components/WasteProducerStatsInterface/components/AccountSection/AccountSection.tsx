import React, { FC, useMemo, useRef, useState, useEffect } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import {
  Package,
  BarChart3,
  CheckCircle2,
  Recycle,
  Clock3,
  ChartNoAxesColumn,
} from "lucide-react-native";
import { BarChart } from "react-native-gifted-charts";
import { EventDetail } from "@/context/WasteProducerStatsContext";
import { AccountSectionProps } from "../types";

export const AccountSection: FC<AccountSectionProps> = ({
  user,
  loading,
  events,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState<"7d" | "30d" | "all">("all");
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const isProducesWaste = user?.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user?.userType === "COLLECTS_WASTE";

  const color = isProducesWaste ? "orange" : isCollectsWaste ? "green" : "gray";
  const bgColor = isProducesWaste
    ? "bg-orange-100"
    : isCollectsWaste
    ? "bg-green-100"
    : "bg-gray-100";
  const textColor = isProducesWaste
    ? "text-orange-700"
    : isCollectsWaste
    ? "text-green-700"
    : "text-gray-700";
  const chartColor = isProducesWaste ? "#c2410c" : "#15803d";

  const now = Date.now();
  const msPerDay = 86400000;
  const periodDays = filter === "7d" ? 7 : filter === "30d" ? 30 : 90;

  const filteredEvents = useMemo(() => {
    if (filter === "all") return events;
    return events.filter(
      (e) => new Date(e.dateTime).getTime() >= now - periodDays * msPerDay
    );
  }, [events, filter]);

  console.log("🔵 AccountSection - filteredEvents:", filteredEvents);
  console.log("🔵 AccountSection - pastEvents:", events);

  const pastEvents = useMemo(() => {
    if (filter === "all") return [];
    return events.filter((e) => {
      const ts = new Date(e.dateTime).getTime();
      return (
        ts >= now - 2 * periodDays * msPerDay &&
        ts < now - periodDays * msPerDay
      );
    });
  }, [events, filter]);

  const getStatsFromEvents = (sourceEvents: EventDetail[]) => {
    let totalWeight = 0;
    let pickupRequests = sourceEvents.length;

    for (const event of sourceEvents) {
      for (const residue of event.residues) {
        totalWeight += residue.quantity;
      }
    }

    return { totalWeight, pickupRequests };
  };

  const currentStats = getStatsFromEvents(filteredEvents);
  const prevStats = getStatsFromEvents(pastEvents);

  const trends = {
    weight: prevStats.totalWeight
      ? +(
          ((currentStats.totalWeight - prevStats.totalWeight) /
            prevStats.totalWeight) *
          100
        ).toFixed(1)
      : 0,
    pickup: prevStats.pickupRequests
      ? +(
          ((currentStats.pickupRequests - prevStats.pickupRequests) /
            prevStats.pickupRequests) *
          100
        ).toFixed(1)
      : 0,
  };

  const sparklineWeight = Array(periodDays).fill(0);
  filteredEvents.forEach((event) => {
    const dayIndex = Math.floor(
      (now - new Date(event.dateTime).getTime()) / msPerDay
    );
    if (dayIndex >= 0 && dayIndex < periodDays) {
      const day = periodDays - dayIndex - 1;
      for (const residue of event.residues) {
        sparklineWeight[day] += residue.quantity;
      }
    }
  });
  const sparklineData = sparklineWeight.map((v) => ({ value: +v.toFixed(1) }));

  const { totalWeight, mostCommonWaste, pickupRequests, hasRecycled } =
    useMemo(() => {
      let totalWeight = 0;
      const residueCountMap: Record<string, number> = {};
      let pickupRequests = filteredEvents.length;
      let hasRecycled = false;

      for (const event of filteredEvents) {
        if (event.status === "completed") hasRecycled = true;
        for (const residue of event.residues) {
          totalWeight += residue.quantity;
          residueCountMap[residue.name] =
            (residueCountMap[residue.name] || 0) + 1;
        }
      }

      const mostCommonWaste =
        Object.entries(residueCountMap).sort((a, b) => b[1] - a[1])[0]?.[0] ||
        "Nenhum";

      return {
        totalWeight,
        mostCommonWaste,
        pickupRequests,
        hasRecycled,
      };
    }, [filteredEvents]);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const cards = [
    {
      label: "Total de Resíduos",
      value: `${totalWeight.toFixed(1)} kg`,
      icon: Package,
      trend: trends.weight,
      sparklineData,
    },
    {
      label: "Pedidos de Coleta",
      value: pickupRequests.toString(),
      icon: CheckCircle2,
      trend: trends.pickup,
      sparklineData,
    },
    {
      label: "Resíduo Mais Comum",
      value: mostCommonWaste,
      icon: BarChart3,
    },
    {
      label: "Participa da Reciclagem",
      value: hasRecycled ? "Sim" : "Não",
      icon: Recycle,
    },
  ];

  const iconColor = isProducesWaste
    ? "#c2410c"
    : isCollectsWaste
    ? "#15803d"
    : "#000000";

  const hasValidData = filteredEvents.some(
    (e) => new Date(e.dateTime).getTime() <= now && e.status === "completed"
  );

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
            <ChartNoAxesColumn size={26} color={iconColor} />
          </View>
          <Text className={`uppercase text-xl font-bold ${textColor}`}>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center mb-3">
        <Clock3 size={16} color={chartColor} />
        <Text className="ml-2 text-xs">Período:</Text>
        <Pressable className="ml-2" onPress={() => setFilter("7d")}>
          <Text
            className={`text-xs px-2 py-1 rounded-full ${
              filter === "7d" ? `${bgColor} ${textColor}` : "text-gray-500"
            }`}
          >
            7 dias
          </Text>
        </Pressable>
        <Pressable className="ml-1" onPress={() => setFilter("30d")}>
          <Text
            className={`text-xs px-2 py-1 rounded-full ${
              filter === "30d" ? `${bgColor} ${textColor}` : "text-gray-500"
            }`}
          >
            30 dias
          </Text>
        </Pressable>
        <Pressable className="ml-1" onPress={() => setFilter("all")}>
          <Text
            className={`text-xs px-2 py-1 rounded-full ${
              filter === "all" ? `${bgColor} ${textColor}` : "text-gray-500"
            }`}
          >
            Tudo
          </Text>
        </Pressable>
      </View>

      <View className="flex flex-row flex-wrap justify-between">
        {!hasValidData && (
          <View className="w-full bg-yellow-100 border-l-4 border-yellow-400 p-3 mb-3 rounded">
            <Text className="text-yellow-800 text-sm font-semibold mb-1">
              Sem dados disponíveis
            </Text>
            <Text className="text-yellow-800 text-xs">
              Não exitem eventos completos neste período. Os insights e gráficos
              da sua conta serão exibidos assim que houver dados disponíveis.
            </Text>
          </View>
        )}
        {cards.map((card, index) => {
          const Icon = card.icon;
          const trendColor =
            card.trend !== undefined
              ? card.trend >= 0
                ? "text-green-600"
                : "text-red-600"
              : "text-gray-500";
          const trendText =
            card.trend !== undefined
              ? `${card.trend > 0 ? "↑" : "↓"}${Math.abs(card.trend)}%`
              : null;
          return (
            <View
              key={index}
              className={`rounded-xl shadow-md w-[48%] mb-3 p-4 ${bgColor} w-fit`}
            >
              <View className="flex-row items-center mb-1">
                <Icon size={18} color={chartColor} />
                <Text className="text-xs text-gray-600 ml-2">{card.label}</Text>
              </View>
              <Text className={`text-xl font-bold text-center ${textColor}`}>
                {card.value}
              </Text>
              {trendText && (
                <Text className={`text-xs mt-1 text-center ${trendColor}`}>
                  {trendText} desde último período
                </Text>
              )}

              {card.sparklineData && (
                <View className="flex mt-2 -mb-2 items-center justify-center">
                  <BarChart
                    data={card.sparklineData}
                    noOfSections={4}
                    yAxisTextStyle={{ fontSize: 8 }}
                    height={90}
                    width={100}
                    showXAxisIndices
                    xAxisIndicesColor={chartColor}
                    xAxisIndicesWidth={2}
                    xAxisLabelTextStyle={{ fontSize: 8 }}
                    barWidth={3}
                    spacing={1.5}
                    barBorderRadius={2}
                    frontColor={chartColor}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    isAnimated
                  />
                </View>
              )}
            </View>
          );
        })}
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
              Novos dados podem ser adicionados aqui
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default AccountSection;
