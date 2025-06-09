import React from "react";
import { View, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { useCollectFlow } from "@/context/CollectFlowContext";

const ChosenResidueCard = () => {
  const {
    selectedResidue,
    weight,
    selectedCondition,
    selectedPackage,
    selectedVariant,
    estimatedValue,
  } = useCollectFlow();

  if (!selectedResidue) return null;

  return (
    <Card className=" mb-4 p-2 rounded-none  bg-slate-100 border-orange-600 border-l shadow text-slate-800">
      <View className=" flex-row items-center">
        {/* Image + Name */}

        <View>
          <Text className="text-xs uppercase font-bold text-orange-500 ">
            {selectedResidue.name.toUpperCase()}
          </Text>

          <View className="flex flex-row items-center  ">
            <Text className="font-medium mr-1 text-slate-700 mt-1">
              {selectedVariant?.label}
            </Text>
            <Text className="font-medium text-xs text-slate-400 mt-1">
              | R$ {selectedVariant?.pricePerKg}/kg
            </Text>
          </View>
          <View className="flex flex-row items-center ">
            <Text className="text-xs text-slate-400 mr-1">
              {selectedCondition}
            </Text>
            <Text className="text-xs text-slate-400">| {selectedPackage}</Text>
          </View>
          <View className="flex flex-row items-center mr-1 ">
            <View className="flex flex-row items-center ">
              <Text className="text-xs text-slate-400 mr-1 mt-1">
                Quantidade:
              </Text>
              <Text className="font-semibold text-slate-600">{weight} Kg</Text>
            </View>
            <View className="flex flex-row items-center mb-1  ml-20">
              <Text className="text-xs text-slate-400 mr-1 mt-1">Preço:</Text>
              <Text className="text-slate-600 text-sm font-semibold">R$ </Text>
              <Text className="font-semibold text-slate-600">
                {estimatedValue?.toFixed(2) || "0.00"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default ChosenResidueCard;
