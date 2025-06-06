import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { RESIDUE_CARDS } from "@/components/custom/WasteManagementInterface/utils/enum";
import {
  Residue,
  ResidueVariant,
} from "@/components/custom/WasteManagementInterface/types";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";

type SingleResidueAndVariantsSectionProps = {
  selectedResidue: Residue | null;
  variants: ResidueVariant[];
  setResidue: (residue: Residue | null) => void;
  setVariant: (variant: ResidueVariant | null) => void;
  selectedVariant: ResidueVariant | null;
};
const SingleResidueAndVariantsSection: React.FC<
  SingleResidueAndVariantsSectionProps
> = ({
  selectedResidue,
  setResidue,
  variants,
  selectedVariant,
  setVariant,
}) => {
  return (
    <>
      <Text className="mt-2 mb-2 text-base font-bold text-orange-600">
        Escolha Seu Resíduo
      </Text>
      {/* Seleção de resíduo */}
      {!selectedResidue && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          layout={Layout.springify()}
          style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
        >
          {RESIDUE_CARDS.map((card) => (
            <TouchableOpacity
              key={card.id}
              onPress={() => setResidue(card)}
              style={{ marginBottom: 8, flexBasis: "48%" }}
            >
              <Card className="flex flex-row items-center rounded-sm  w-full bg-orange-100 shadow ">
                <Image
                  source={{ uri: card.image }}
                  size="xs"
                  alt={`Imagem de ${card.alt}`}
                  className="h-12"
                />
                <View className="mx-auto">
                  <Text className="text-orange-600 font-bold">{card.name}</Text>
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
        >
          <TouchableOpacity onPress={() => setResidue(null)}>
            <View className="flex flex-row">
              <View className="-mt-1 mr-1">
                <Text style={{ color: "#f97316", marginBottom: 8 }}>←</Text>
              </View>
              <View>
                <Text style={{ color: "#f97316", marginBottom: 8 }}>
                  Voltar
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <Card className="flex flex-row items-center border border-orange-500 w-full rounded-sm">
            <View className=" mx-auto">
              <Text className="font-bold text-orange-500">
                {selectedResidue.name}
              </Text>
            </View>
          </Card>

          <Card
            style={{
              borderColor: "#f97316",
              backgroundColor: "#ffedd5",
              padding: 10,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            {variants.length > 0 && (
              <View className="mt-2">
                {variants.map((variant, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setVariant(variant)}
                    className={`p-3 mb-2 shadow rounded-sm bg-white ${
                      selectedVariant?.label === variant.label
                        ? "border border-orange-500 "
                        : "border-gray-300"
                    }`}
                  >
                    <Text className="text-base font-medium">
                      {variant.label}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      R$ {variant.pricePerKg}/kg • Mín: {variant.minWeightKg}
                      kg
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Card>
        </Animated.View>
      )}
    </>
  );
};
export default SingleResidueAndVariantsSection;
