import React, { FC, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { ChartColumn } from "lucide-react-native";
import { ResiduesSection } from "./components/ResiduesSection";
import { CollectsSection } from "./components/CollectsSection";
import {
  EventDetail,
  useWasteProducerStats,
} from "@/context/WasteProducerStatsContext";
import { CollectStats } from "./components/CollectsSection/CollectsSection";
import { AccountSection } from "./components/AccountSection";
import {
  ResidueStatsByStatus,
  WasteProducerStatsInterfaceProps,
} from "../types";

const WasteProducerStatsInterface: FC<WasteProducerStatsInterfaceProps> = ({
  user,
}) => {
  const { summary, residueRanking, loading, fetchStats, events } =
    useWasteProducerStats();
  const isProducesWaste = user?.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user?.userType === "COLLECTS_WASTE";

  const iconColor = isProducesWaste
    ? "#c2410c"
    : isCollectsWaste
    ? "#15803d"
    : "#000000";

  useEffect(() => {
    fetchStats(); // can optionally pass date filters
  }, []);

  console.log("🔵 WasteProducerStatsInterface - summary:", summary);
  console.log(
    "🔵 WasteProducerStatsInterface - residueRanking:",
    residueRanking
  );
  console.log("🔵 WasteProducerStatsInterface - loading:", loading);

  function buildResidueStatsPerStatus(events: EventDetail[]) {
    const result: ResidueStatsByStatus = {};

    for (const event of events) {
      const { status, residues } = event;

      if (!result[status]) {
        result[status] = {};
      }

      for (const residue of residues) {
        const existing = result[status][residue.name];

        if (existing) {
          existing.count += 1;
          existing.totalQuantity += residue.quantity;
        } else {
          result[status][residue.name] = {
            count: 1,
            totalQuantity: residue.quantity,
          };
        }
      }
    }

    return result;
  }

  function buildCollectStats(events: EventDetail[]): CollectStats[] {
    type Status = "completed" | "expired" | "canceled" | "scheduled";

    const statusCounts: Record<Status, number> = {
      completed: 0,
      expired: 0,
      canceled: 0,
      scheduled: 0,
    };
    const statusQuantities: Record<Status, number> = {
      completed: 0,
      expired: 0,
      canceled: 0,
      scheduled: 0,
    };

    events.forEach((event) => {
      const { status, residues } = event;
      const totalQuantity = residues.reduce(
        (sum, residue) => sum + residue.quantity,
        0
      );

      if (status in statusCounts) {
        const typedStatus = status as Status;
        statusCounts[typedStatus] += 1;
        statusQuantities[typedStatus] += totalQuantity;
      }
    });

    const collectStats: CollectStats[] = (
      Object.keys(statusCounts) as Status[]
    ).map((status) => {
      const count = statusCounts[status];
      const totalQuantity = statusQuantities[status];
      const avgQuantity = count > 0 ? totalQuantity / count : 0;

      return {
        status,
        count,
        avgQuantity,
        successRate: status === "completed" ? count / events.length : 0,
        expiredRate: status === "expired" ? count / events.length : 0,
        canceledRate: status === "canceled" ? count / events.length : 0,
        scheduled: status === "scheduled" ? count : 0,
        completed: status === "completed" ? count : 0,
      };
    });

    return collectStats;
  }

  const residueStatsPerStatus = buildResidueStatsPerStatus(events);
  const collectStats = buildCollectStats(events);

  return (
    <ScrollView className="flex-1 ">
      <View className="py-4">
        <View
          className={`flex flex-row mx-2 border-b 
                    ${
                      isProducesWaste && !isCollectsWaste
                        ? "border-orange-700"
                        : ""
                    } 
                    ${
                      !isProducesWaste && isCollectsWaste
                        ? "border-green-700"
                        : ""
                    }
                  `}
        >
          <View className="mr-2">
            <ChartColumn size={32} color={iconColor} />
          </View>
          <View className="mt-2">
            <Text
              className={`text-left text-3xl font-bold  ${
                isProducesWaste && !isCollectsWaste ? "text-orange-700" : ""
              } 
                        ${
                          !isProducesWaste && isCollectsWaste
                            ? "text-green-700"
                            : ""
                        }`}
            >
              ESTATÍSTICAS
            </Text>
          </View>
        </View>
        <View className="px-2 my-2">
          <Text className="text-left text-sm font-normal">
            Visualize suas estátisticas como coletor de resíduos, coletas
            completas, quantidade de residuos reciclados e mais.
          </Text>
        </View>
        <AccountSection user={user} loading={loading} events={events} />
        <CollectsSection
          user={user}
          loading={loading}
          collectStats={collectStats}
        />
        <ResiduesSection
          user={user}
          loading={loading}
          residueStatsPerStatus={residueStatsPerStatus}
          summary={
            summary || {
              completed: 0,
              expired: 0,
              scheduled: 0,
              canceled: 0,
              total: 0,
            }
          }
        />
      </View>
    </ScrollView>
  );
};
export default WasteProducerStatsInterface;
