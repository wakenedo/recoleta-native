import React from "react";
import { View, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { useCollectFlow } from "@/context/CollectFlowContext";

const ChosenResidueCard = () => {
  const { selectedResidue, weight, selectedCondition, selectedPackage } =
    useCollectFlow();

  if (!selectedResidue) return null;

  return (
    <Card className=" mb-4 p-2  bg-green-200 shadow-lg text-slate-800">
      <View className=" flex-row items-center  bg-zinc-50 rounded">
        {/* Image + Name */}
        <View className="flex items-center justify-center p-5 ml-[3px] border-green-200 bg-green-100 border-r-2 rounded-l">
          {selectedResidue.image && (
            <Image
              source={{ uri: selectedResidue.image }}
              style={{
                width: 75,
                height: 75,
              }}
            />
          )}
        </View>

        <View className=" p-3  ">
          <View className="mb-2">
            <Text className="text-lg  font-bold text-green-500">
              {selectedResidue.name.toUpperCase()}
            </Text>
          </View>
          <Text className="text-xs">
            <Text className="font-normal">Condição:</Text>{" "}
            <Text className="font-medium">{selectedCondition}</Text>
          </Text>
          <Text className="text-xs">
            <Text className="font-normal">Quantidade:</Text>{" "}
            <Text className="font-medium">{weight} Kg</Text>
          </Text>
          <Text className="text-xs">
            <Text className="font-normal">Embalagem:</Text>{" "}
            <Text className="font-medium">{selectedPackage}</Text>
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default ChosenResidueCard;
