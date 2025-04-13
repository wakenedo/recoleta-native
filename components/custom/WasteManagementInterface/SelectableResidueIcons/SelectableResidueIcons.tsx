import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  View,
  Image as RNImage,
} from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { SelectableResidueIconsProps } from "../types";
import { RESIDUE_CARDS } from "../utils/enum";

const SelectableResidueIcons: React.FC<SelectableResidueIconsProps> = ({
  selectedResidue,
  setSelectedResidue,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        const promises = RESIDUE_CARDS.map((card) =>
          RNImage.prefetch(card.image)
        );
        await Promise.all(promises);
      } catch (err) {
        console.warn("[ResidueIcons] Error preloading images:", err);
      } finally {
        setLoading(false);
      }
    };

    preloadImages();
  }, []);

  if (loading) {
    return (
      <View className="items-center justify-center h-48">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-2">Carregando imagens...</Text>
      </View>
    );
  }

  return (
    <View>
      <Heading size="xs">Tipo de Resíduo</Heading>
      <View className="flex-row flex-wrap justify-between mt-2">
        {RESIDUE_CARDS.map((card) => {
          const isSelected = selectedResidue?.id === card.id;
          return (
            <Card
              onTouchStart={() => setSelectedResidue(card)}
              key={card.id}
              className={`items-center my-2 border ${
                Platform.OS === "android" ? "w-[165px]" : "w-[150px]"
              } ${isSelected ? "border-blue-500" : "border-zinc-300"}`}
            >
              <Image
                source={{ uri: card.image }}
                style={{
                  width: "100%",
                  aspectRatio: 1,
                  resizeMode: "contain",
                }}
                alt={`Imagem de ${card.alt}`}
                className="h-24"
              />
              <View className="mt-5">
                <Text
                  className={`${isSelected ? "font-bold text-blue-500" : ""}`}
                >
                  {card.name}
                </Text>
              </View>
            </Card>
          );
        })}
      </View>
    </View>
  );
};

export default SelectableResidueIcons;
