import React from "react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { SelectableResidueIconsProps } from "../types";
import { RESIDUE_CARDS } from "../utils/enum";

const SelectableResidueIcons: React.FC<SelectableResidueIconsProps> = ({
  selectedResidue,
  setSelectedResidue,
}) => {
  return (
    <View>
      <Heading size="xs">Tipo de Resído</Heading>
      <View className="flex-row flex-wrap justify-between mt-2">
        {RESIDUE_CARDS.map((card) => {
          const isSelected = selectedResidue?.id === card.id;
          return (
            <Card
              onTouchStart={() => setSelectedResidue(card)}
              key={card.id}
              className={`items-center my-2 border w-[150px] h-fit p-2 rounded-lg 
                  ${isSelected ? "border-blue-500" : "border-zinc-300"}`}
            >
              <Image
                source={{ uri: card.image }}
                style={{
                  height: 250,
                  width: 250,
                }}
                className="  w-[100px] h-[125px]"
              />
              <Text
                className={`${isSelected ? "font-bold text-blue-500" : ""}`}
              >
                {card.name}
              </Text>
            </Card>
          );
        })}
      </View>
    </View>
  );
};
export default SelectableResidueIcons;
