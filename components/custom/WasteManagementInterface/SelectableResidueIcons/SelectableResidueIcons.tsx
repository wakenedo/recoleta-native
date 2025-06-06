import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  View,
  Image as RNImage,
  ScrollView,
} from "react-native";
import { Text } from "@/components/ui/text";
import { ResidueVariant, SelectableResidueIconsProps } from "../types";
import { RESIDUE_CARDS } from "../utils/enum";
import { useAuth } from "@/context/AuthContext";
import { usePriceTable } from "@/hooks/usePriceTable";
import { InterfaceSwitch } from "../../InterfaceSwitch";
import { useCollectFlow } from "@/context/CollectFlowContext";
import { SingleResidueSelector } from "./SingleResidueSelector";
import { MultipleResidueSelector } from "./MultipleResidueSelector";

const SelectableResidueIcons: React.FC<SelectableResidueIconsProps> = ({
  photo,
  setPhoto,
  selectedResidue,
  weight,
  setWeight,
  setResidue,
  selectedVariant,
  selectedCondition,
  selectedPackage,
  setCondition,
  setPackage,
  setVariant,
  setResidues,
}) => {
  const [toggleDefault, setToggleDefault] = useState(false);
  const { authState } = useAuth();
  const { resetCollectFlow } = useCollectFlow();
  const { loading, priceTable } = usePriceTable(authState?.token ?? "", "sp");

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

  const handleSwitchChange = (isToggled: boolean) => {
    setToggleDefault(isToggled); // Update state based on user action
    resetCollectFlow();
  };

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
      <InterfaceSwitch
        leftLabel="Resíduo Único"
        rightLabel="Multiplos Resíduos"
        onToggleChange={handleSwitchChange}
        value={toggleDefault}
        leftComponent={
          <SingleResidueSelector
            photo={photo}
            weight={weight}
            variants={variants}
            selectedResidue={selectedResidue}
            selectedVariant={selectedVariant}
            selectedCondition={selectedCondition}
            selectedPackage={selectedPackage}
            setPhoto={setPhoto}
            setVariant={setVariant}
            setResidue={setResidue}
            setWeight={setWeight}
            setCondition={setCondition}
            setPackage={setPackage}
          />
        }
        rightComponent={
          <ScrollView>
            <MultipleResidueSelector
              photo={photo}
              setPhoto={setPhoto}
              weight={weight}
              variants={variants}
              selectedResidue={selectedResidue}
              selectedVariant={selectedVariant}
              selectedCondition={selectedCondition}
              selectedPackage={selectedPackage}
              setVariant={setVariant}
              setResidue={setResidue}
              setResidues={setResidues}
              setWeight={setWeight}
              setCondition={setCondition}
              setPackage={setPackage}
            />
          </ScrollView>
        }
      />
    </View>
  );
};

export default SelectableResidueIcons;
