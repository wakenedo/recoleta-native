import React from "react";
import { View, Alert } from "react-native";
import {
  Residue,
  ResidueAndVariantsSelectorProps,
  ResidueVariant,
} from "../../types";
import { useCollectFlow } from "@/context/CollectFlowContext";
import { SavedResiduesSection } from "./components/SavedResiduesSection";
import { WasteManagementHeadingSection } from "../../WasteManagementHeadingSection";
import { MultipleResiduesAndVariantsSection } from "./components/MultipleResiduesAndVariantsSection";
const MultipleResidueSelector: React.FC<ResidueAndVariantsSelectorProps> = ({
  photo,
  variants,
  weight,
  selectedResidue,
  selectedVariant,
  selectedCondition,
  selectedPackage,
  setCondition,
  setPhoto,
  setPackage,
  setResidue,
  setResidues,
  setVariant,
  setWeight,
}) => {
  const { residues } = useCollectFlow();

  const handleSave = () => {
    if (!selectedResidue || !selectedVariant) {
      Alert.alert(
        "Erro",
        "Preencha o peso e selecione uma variante (se aplicável)"
      );
      return;
    }

    if ((residues?.length ?? 0) >= 10) {
      Alert.alert("Limite atingido", "Máximo de 10 resíduos permitidos.");
      return;
    }

    // Use the selected variant (passed via props) instead of mapping all variants
    const newResidue: Residue = {
      ...selectedResidue,
      id: selectedResidue.id,
      photo: photo,
      alt: selectedResidue.alt,
      variant: selectedVariant,
      weight: parseFloat(weight),
      condition: selectedCondition || "Nenhuma condição",
      pkg: selectedPackage || "Nenhuma embalagem",
    };

    if (setResidues) {
      setResidues([...(residues ?? []), newResidue]);
    }
    setWeight("");
    setResidue(null);
    setVariant(null);
  };

  const handleRemove = (variantLabel: string | undefined) => {
    if (setResidues) {
      setResidues(
        (residues ?? []).filter((r) => r.variant?.label !== variantLabel)
      );
    }
  };

  console.log("Residues:", residues);

  const calculatePrice = (variant: ResidueVariant | null, weight: string) => {
    if (!variant || !weight) return "0.00";
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) return "0.00";
    return (variant.pricePerKg * weightNum).toFixed(2);
  };

  const title = "Detalhes dos Resíduos para Descarte";
  const description =
    "Escolha até 10 resíduos por coleta. Selecione o(s) resíduo(s) desejado(s) e preencha os detalhes necessários para agendar a coleta.";

  return (
    <View className="pt-4">
      <WasteManagementHeadingSection title={title} description={description} />

      <MultipleResiduesAndVariantsSection
        photo={photo}
        variants={variants}
        weight={weight}
        selectedResidue={selectedResidue}
        selectedVariant={selectedVariant}
        selectedCondition={selectedCondition}
        selectedPackage={selectedPackage}
        setPhoto={setPhoto}
        setWeight={setWeight}
        setCondition={setCondition}
        setPackage={setPackage}
        setResidue={setResidue}
        setVariant={setVariant}
        handleSave={handleSave}
      />
      <SavedResiduesSection
        residues={residues}
        handleRemove={handleRemove}
        calculatePrice={calculatePrice}
      />
    </View>
  );
};

export default MultipleResidueSelector;
