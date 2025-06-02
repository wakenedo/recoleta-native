import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  View,
  Image as RNImage,
  TouchableOpacity,
} from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Residue, ResidueVariant } from "../types";
import { RESIDUE_CARDS } from "../utils/enum";
import { useAuth } from "@/context/AuthContext";

import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { ArrowLeftIcon } from "lucide-react-native";
import { usePriceTable } from "@/hooks/usePriceTable";

type SelectableResidueIconsProps = {
  selectedResidue: Residue | null;
  setResidue: (residue: Residue | null) => void;
  selectedVariant: ResidueVariant | null;
  setVariant: (variant: ResidueVariant | null) => void;
};

const SelectableResidueIcons: React.FC<SelectableResidueIconsProps> = ({
  selectedResidue,
  setResidue,
  selectedVariant,
  setVariant,
}) => {
  const { authState } = useAuth();
  const { loading, priceTable } = usePriceTable(authState?.token ?? "");

  // Preload das imagens dos resíduos
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const promises = RESIDUE_CARDS.map((card) =>
          RNImage.prefetch(card.image)
        );
        await Promise.all(promises);
      } catch (err) {
        console.warn("[ResidueIcons] Error preloading images:", err);
      }
    };

    preloadImages();
  }, []);

  // Busca da tabela de preços

  // Variantes calculadas via useMemo
  const variants: ResidueVariant[] = useMemo(() => {
    if (selectedResidue?.apiName) {
      return priceTable?.[selectedResidue.apiName]?.variants || [];
    }
    return [];
  }, [selectedResidue, priceTable]);

  // Limpa variante ao mudar de resíduo
  useEffect(() => {
    if (selectedVariant && selectedResidue) {
      setVariant(null);
    }
  }, [selectedResidue]);

  if (loading) {
    return (
      <View className="items-center justify-center h-48">
        <ActivityIndicator size="large" color="#4B9CD3" />
        <Text className="mt-2">Carregando imagens...</Text>
      </View>
    );
  }

  return (
    <View>
      <Heading size="xs">Tipo de Resíduo</Heading>

      {/* Seleção de resíduo */}
      {!selectedResidue && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          layout={Layout.springify()}
          className="flex justify-between mt-2 w-full"
        >
          {RESIDUE_CARDS.map((card) => (
            <TouchableOpacity
              key={card.id}
              onPress={() => setResidue(card)}
              className="mb-2"
            >
              <Card className="flex flex-row items-center border w-full border-zinc-300">
                <Image
                  source={{ uri: card.image }}
                  width={10}
                  height={10}
                  alt={`Imagem de ${card.alt}`}
                  className="h-8"
                />
                <View className="mt-5">
                  <Text>{card.name}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}

      {/* Tela de variantes do resíduo selecionado */}
      {selectedResidue && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          layout={Layout.springify()}
          className="mt-2"
        >
          <TouchableOpacity
            onPress={() => {
              setResidue(null);
              setVariant(null);
            }}
            className="mb-4"
          >
            <View className="flex flex-row items-center">
              <View className="mr-1">
                <ArrowLeftIcon size={16} color="#4B9CD3" className="mb-2" />
              </View>
              <Text className="text-blue-500 underline items-center">
                Voltar a seleção de resíduo
              </Text>
            </View>
          </TouchableOpacity>

          <Card className="flex flex-row items-center border border-blue-500 w-full">
            <Image
              source={{ uri: selectedResidue.image }}
              width={10}
              height={10}
              alt={`Imagem de ${selectedResidue.alt}`}
              className="h-8"
            />
            <View className="mt-5">
              <Text className="font-bold text-blue-500">
                {selectedResidue.name}
              </Text>
            </View>
          </Card>

          {variants.length > 0 && (
            <View className="mt-4 pl-2">
              <Text className="mb-2 font-semibold">Tipo específico</Text>
              {variants.map((variant, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setVariant(variant)}
                  className={`p-3 rounded-md mb-2 border ${
                    selectedVariant?.label === variant.label
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300"
                  }`}
                >
                  <Text className="text-base font-medium">{variant.label}</Text>
                  <Text className="text-xs text-gray-500">
                    R$ {variant.pricePerKg}/kg • Mín: {variant.minWeightKg}kg
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
};

export default SelectableResidueIcons;
