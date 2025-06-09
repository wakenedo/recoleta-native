import { Residue } from "@/components/custom/WasteManagementInterface/types";
import { Card } from "@/components/ui/card";
import { useCollectFlow } from "@/context/CollectFlowContext";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";

type ChosenResiduesInterfaceProps = {
  residues: Residue[];
};

const ChosenResiduesInterface: React.FC<ChosenResiduesInterfaceProps> = ({
  residues,
}) => {
  const { estimatedValue, setCollectFlowData } = useCollectFlow();
  if (residues === undefined) return;

  const calculateTotalOrderValue = (): number => {
    if (!residues) return 0;

    return residues.reduce((acc, r) => {
      const weight = r.weight ?? 0;
      const price = r.variant?.pricePerKg ?? 0;
      return acc + weight * price;
    }, 0);
  };

  useEffect(() => {
    const total = calculateTotalOrderValue();
    setCollectFlowData({ estimatedValue: total });
  }, [residues]);

  return (
    <View>
      <View>
        <ScrollView className="flex-1 w-full max-h-72">
          <View>
            {residues.map((r) => {
              const registeredWeight = r.weight;
              const variantPricePerKilo = r.variant?.pricePerKg;
              if (registeredWeight === undefined) return;
              if (variantPricePerKilo === undefined) return;
              const result = registeredWeight * variantPricePerKilo;
              const calculateVariantEstimatedValue = () => {
                return result;
              };

              return (
                <View key={r.variant?.label} className="p-1">
                  <Card className="p-2 rounded-none  bg-slate-100 border-orange-600 border-l shadow text-slate-800">
                    <View className=" flex-row items-center">
                      {/* Image + Name */}

                      <View>
                        <Text className="text-xs uppercase font-bold text-orange-500 ">
                          {r.name.toUpperCase()}
                        </Text>

                        <View className="flex flex-row items-center  ">
                          <Text className="font-medium mr-1 text-slate-700 mt-1">
                            {r.variant?.label}
                          </Text>
                          <Text className="font-medium text-xs text-slate-400 mt-1">
                            | R$ {r.variant?.pricePerKg}/kg
                          </Text>
                        </View>
                        <View className="flex flex-row items-center ">
                          <Text className="text-xs text-slate-400 mr-1">
                            {r.condition}
                          </Text>
                          <Text className="text-xs text-slate-400">
                            | {r.pkg}
                          </Text>
                        </View>
                        <View className="flex flex-row items-center mr-1 ">
                          <View className="flex flex-row items-center ">
                            <Text className="text-xs text-slate-400 mr-1 mt-1">
                              Quantidade:
                            </Text>
                            <Text className="font-semibold text-slate-600">
                              {r.weight} Kg
                            </Text>
                          </View>
                          <View className="flex flex-row items-center mb-1  ml-20">
                            <Text className="text-xs text-slate-400 mr-1 mt-1">
                              Preço:
                            </Text>
                            <Text className="text-slate-600 text-sm font-semibold">
                              R${" "}
                            </Text>
                            <Text className="font-semibold text-slate-600">
                              {calculateVariantEstimatedValue()?.toFixed(2) ||
                                "0.00"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View className="flex flex-row items-center bg-slate-100 w-full h-14 p-2 mt-2">
        <Text className="text-xs text-slate-400 mt-1 mr-1">Valor total:</Text>
        <Text className="text-base text-slate-500 font-medium">R$</Text>
        <Text className="text-lg text-slate-600 font-semibold">
          {" "}
          {estimatedValue?.toFixed(2) ?? "0.00"}
        </Text>
      </View>
    </View>
  );
};
export default ChosenResiduesInterface;
