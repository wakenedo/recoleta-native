import React, { FC } from "react";
import { ScrollView, Text, View } from "react-native";
import { User } from "@/app/Home";
import { ChartColumn } from "lucide-react-native";
import { ResiduesSection } from "./components/ResiduesSection";
import { CollectsSection } from "./components/CollectsSection";
import { AddressSection } from "./components/AddressSection";
import { useWasteProducer } from "@/context/WasteProducerContext";
import { AccountSection } from "./components/AccountSection";

interface WasteProducerStatsInterfaceProps {
  user: User | null;
}

const WasteProducerStatsInterface: FC<WasteProducerStatsInterfaceProps> = ({
  user,
}) => {
  const { collects, loading, fetchCollects } = useWasteProducer();
  const isProducesWaste = user?.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user?.userType === "COLLECTS_WASTE";

  const iconColor = isProducesWaste
    ? "#c2410c"
    : isCollectsWaste
    ? "#15803d"
    : "#000000";
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
        <AccountSection user={user} loading={loading} AccStats={[]} />
        <CollectsSection user={user} loading={loading} collects={[]} />
        <ResiduesSection user={user} loading={loading} residues={[]} />
      </View>
    </ScrollView>
  );
};
export default WasteProducerStatsInterface;
