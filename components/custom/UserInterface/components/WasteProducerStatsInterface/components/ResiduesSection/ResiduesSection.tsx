import React, { FC, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  ActivityIndicator,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { BarChart } from "react-native-gifted-charts";
import { Gem } from "lucide-react-native";
import { User } from "@/types";

interface Residue {
  name: string;
  totalQuantity: number;
  count: number;
}

interface ResidueStatsByStatus {
  [status: string]: {
    [name: string]: {
      count: number;
      totalQuantity: number;
    };
  };
}

interface ResiduesSectionProps {
  user: User | null;
  loading: boolean;
  residueStatsPerStatus: ResidueStatsByStatus;
  summary: {
    completed: number;
    expired: number;
    scheduled: number;
    canceled: number;
    total: number;
  };
}

const statusLabels: Record<string, string> = {
  completed: "Coletas Concluídas",
  scheduled: "Coletas Agendadas",
  canceled: "Coletas Canceladas",
  expired: "Coletas Expiradas",
};

const ResiduesSection: FC<ResiduesSectionProps> = ({
  user,
  loading,
  residueStatsPerStatus,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedResidue, setSelectedResidue] = useState<string | null>(
    "__all__"
  );
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

  // Set initial selected status
  useEffect(() => {
    if (!selectedStatus && residueStatsPerStatus) {
      const statusOrder = ["completed", "scheduled", "canceled", "expired"];
      const firstAvailable = statusOrder.find(
        (status) =>
          residueStatsPerStatus[status] &&
          Object.keys(residueStatsPerStatus[status]).length > 0
      );
      if (firstAvailable) {
        setSelectedStatus(firstAvailable);
      }
    }
  }, [residueStatsPerStatus, selectedStatus]);

  const statusesWithData = Object.entries(residueStatsPerStatus)
    .filter(([_, data]) => Object.keys(data).length > 0)
    .map(([status]) => status);

  const residuesMap =
    selectedResidue && selectedResidue !== "__all__"
      ? statusesWithData.reduce((acc, status) => {
          const residueStats = residueStatsPerStatus[status]?.[selectedResidue];
          if (residueStats) {
            acc[status] = { [selectedResidue]: residueStats };
          }
          return acc;
        }, {} as ResidueStatsByStatus)
      : selectedStatus
      ? { [selectedStatus]: residueStatsPerStatus[selectedStatus] || {} }
      : {};

  const allResidues: Residue[] = Object.entries(residuesMap).flatMap(
    ([status, residues]) =>
      Object.entries(residues).map(([name, stats]) => ({
        name:
          selectedResidue && selectedResidue !== "__all__"
            ? statusLabels[status] || status
            : name,
        totalQuantity: stats.totalQuantity,
        count: stats.count,
      }))
  );

  const chartDataBar = allResidues.map((r) => ({
    label: r.name.length > 6 ? r.name.slice(0, 6) + "…" : r.name,
    value: useQuantity ? r.totalQuantity : r.count,
    frontColor: mainColor,
    gradientColor,
    showGradient: true,
    topLabelComponent: () => (
      <Text style={{ fontSize: 10, color: "#444", marginBottom: 4 }}>
        {useQuantity ? `${r.totalQuantity}kg` : `${r.count}x`}
      </Text>
    ),
  }));

  const residuesWithData = selectedStatus
    ? Object.keys(residueStatsPerStatus[selectedStatus] || {})
    : [];

  return (
    <View
      className={`justify-center border-l mx-2 ${
        isProducesWaste && !isCollectsWaste ? "border-l-orange-300" : ""
      } ${!isProducesWaste && isCollectsWaste ? "border-l-green-300" : ""}
        rounded p-4 bg-white shadow-md mb-4`}
    >
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row">
          <View className="mr-1">
            <Gem size={26} color={iconColor} />
          </View>
          <Text
            className={`text-xl font-bold ${
              isProducesWaste && !isCollectsWaste ? "text-orange-700" : ""
            } ${!isProducesWaste && isCollectsWaste ? "text-green-700" : ""}`}
          >
            RESÍDUOS
          </Text>
        </View>
      </View>

      <View className="flex flex-col bg-slate-50 shadow-lg items-center justify-center rounded p-2 mt-2">
        {loading || !selectedStatus ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : chartDataBar.length === 0 ? (
          <Text className="text-sm text-gray-500">Sem dados disponíveis</Text>
        ) : (
          <>
            <Text className="text-sm font-medium text-gray-600 mb-2">
              Exibindo:{" "}
              {selectedResidue && selectedResidue !== "__all__"
                ? `${selectedResidue} em todas as coletas`
                : statusLabels[selectedStatus] || selectedStatus}
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
            <Text className="text-xs">Filtros</Text>
            <Text className="text-sm text-gray-500">
              {expanded ? "▲" : "▼"}
            </Text>
          </View>
        </Pressable>
      </View>

      {expanded && selectedStatus && (
        <Animated.View style={{ opacity: animatedOpacity }}>
          <View className="mt-2">
            <Text className="text-xs text-gray-500">Filtrar por status:</Text>
            <View className="border rounded border-gray-200 mt-1">
              <Picker
                selectedValue={selectedStatus}
                onValueChange={(itemValue) => setSelectedStatus(itemValue)}
              >
                {statusesWithData.map((statusKey) => (
                  <Picker.Item
                    key={statusKey}
                    label={statusLabels[statusKey] || statusKey}
                    value={statusKey}
                  />
                ))}
              </Picker>
            </View>

            {residuesWithData.length > 1 && (
              <>
                <Text className="text-xs text-gray-500 mt-2">
                  Filtrar por resíduo:
                </Text>
                <View className="border rounded border-gray-200 mt-1">
                  <Picker
                    selectedValue={selectedResidue}
                    onValueChange={(itemValue) => setSelectedResidue(itemValue)}
                  >
                    <Picker.Item label="Todos" value="__all__" />
                    {residuesWithData.map((residueName) => (
                      <Picker.Item
                        key={residueName}
                        label={residueName}
                        value={residueName}
                      />
                    ))}
                  </Picker>
                </View>
              </>
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default ResiduesSection;
