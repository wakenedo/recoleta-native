import React, { FC } from "react";
import { Text, View } from "react-native";
import { User } from "@/app/Home";
import { ChartColumn } from "lucide-react-native";

interface WasteProducerStatsInterfaceProps {
  user: User | null;
}

const WasteProducerStatsInterface: FC<WasteProducerStatsInterfaceProps> = ({
  user,
}) => {
  const isProducesWaste = user?.userType === "PRODUCES_WASTE";
  const isCollectsWaste = user?.userType === "COLLECTS_WASTE";

  const iconColor = isProducesWaste
    ? "#c2410c"
    : isCollectsWaste
    ? "#15803d"
    : "#000000";
  return (
    <View className="flex-1 ">
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
          <Text className="text-left text-sm font-bold">
            Visualize suas estátisticas como coletor de resíduos, coletas
            completas, quantidade de residuos reciclados e mais.
          </Text>
        </View>
      </View>
    </View>
  );
};
export default WasteProducerStatsInterface;
