import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  View,
  Image as RNImage,
  TouchableOpacity,
} from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { SelectableResidueIconsProps, ResidueVariant } from "../types";
import { RESIDUE_CARDS } from "../utils/enum";
import { useAuth } from "@/context/AuthContext";

type PriceTable = Record<string, { variants: ResidueVariant[] }>;

const SelectableResidueIcons: React.FC<SelectableResidueIconsProps> = ({
  selectedResidue,
  setSelectedResidue,
  selectedVariant,
  setSelectedVariant,
}) => {
  const { authState } = useAuth();
  const [loading, setLoading] = useState(true);
  // priceTable é um objeto: { [apiName: string]: ResidueVariant[] }
  const [priceTable, setPriceTable] = useState<PriceTable>({});
  // variants é o array de variantes para o resíduo selecionado
  const [variants, setVariants] = useState<ResidueVariant[]>([]);

  // Preload das imagens
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

  // Busca tabela de preços
  useEffect(() => {
    const fetchPriceTable = async () => {
      try {
        const res = await fetch(
          "http://192.168.96.2:5000/api/price-tables/sp",
          {
            headers: { Authorization: `Bearer ${authState?.token}` },
          }
        );
        const json = await res.json();
        // Aqui assumimos que json é do tipo Record<string, ResidueVariant[]>
        setPriceTable(json);
      } catch (err) {
        console.warn("[ResidueIcons] Erro ao buscar tabela de preços:", err);
      }
    };

    fetchPriceTable();
  }, [authState?.token]);

  // Atualiza variantes quando um resíduo é selecionado ou priceTable muda
  useEffect(() => {
    if (selectedResidue?.apiName) {
      // Corrigido para acessar a propriedade .variants
      const variantsForResidue =
        priceTable[selectedResidue.apiName]?.variants || [];
      setVariants(variantsForResidue);
      if (setSelectedVariant) {
        setSelectedVariant(null); // limpa seleção anterior
      }
    } else {
      setVariants([]);
      setSelectedVariant?.(null);
    }
  }, [selectedResidue, priceTable, setSelectedVariant]);

  if (loading) {
    return (
      <View className="items-center justify-center h-48">
        <ActivityIndicator size="large" color="#4B9CD3" />
        <Text className="mt-2">Carregando imagens...</Text>
      </View>
    );
  }

  console.log("[SelectableResidueIcons] Variants Length:", variants.length);
  console.log(
    "[SelectableResidueIcons] Selected Residue:",
    selectedResidue?.name
  );
  console.log("[SelectableResidueIcons] Variants:", variants);

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

      {variants.length > 0 && (
        <View className="mt-4">
          <Text className="mb-2 font-semibold">Tipo específico</Text>
          {variants.map((variant, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setSelectedVariant?.(variant)}
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
    </View>
  );
};

export default SelectableResidueIcons;
