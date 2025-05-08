import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

import { User } from "@/app/Home";
import { ScheduledCollects } from "./components/ScheduledCollects";
import { CompleteCollects } from "./components/CompleteCollects";
import { ExpiredCollects } from "./components/ExpiredCollects";
import { CanceledCollects } from "./components/CanceledCollects";
import { useWasteProducer } from "@/context/WasteProducerContext";
import { Calendar } from "lucide-react-native";

interface WasteProducerHistoryProps {
  user: User | null;
}

const WasteProducerHistoryInterface: React.FC<WasteProducerHistoryProps> = ({
  user,
}) => {
  const sections = [
    { key: "scheduled", component: ScheduledCollects },
    { key: "complete", component: CompleteCollects },
    { key: "expired", component: ExpiredCollects },
    { key: "canceled", component: CanceledCollects },
  ];
  const isProducesWaste = user?.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user?.userType === "COLLECTS_WASTE";

  const iconColor = isProducesWaste
    ? "#c2410c"
    : isCollectsWaste
    ? "#15803d"
    : "#000000";

  const { collects, loading, fetchCollects } = useWasteProducer();

  useEffect(() => {
    const fetchData = async () => {
      await fetchCollects();
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: any) => {
    const Section = item.component;
    return <Section user={user} collects={collects} loading={loading} />;
  };

  const ListHeading = () => {
    return (
      <View className="py-4 px-2">
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
            <Calendar size={32} color={iconColor} />
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
              HISTÓRICO
            </Text>
          </View>
        </View>
        <View className="px-2 my-2">
          <Text className="text-left text-sm font-normal">
            Visualize as coletas agendadas, completas, expiradas ou canceladas.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      ListHeaderComponent={<ListHeading />}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={true}
    />
  );
};

export default WasteProducerHistoryInterface;
