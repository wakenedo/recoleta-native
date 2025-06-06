import React from "react";
import { View } from "react-native";
import { ResidueAndVariantsSelectorProps } from "../../types";
import { QuantityInput } from "../../QuantityInput";
import { ResidueConditionSelector } from "../../ResidueConditionSelector";
import { PackageAvailableSelector } from "../../PackageAvailableSelector";
import { TakeResiduePhoto } from "../../TakeResiduePhoto";
import { WasteManagementHeadingSection } from "../../WasteManagementHeadingSection";
import { SingleResidueAndVariantsSection } from "./components/SingleResidueAndVariantSection";

const SingleResidueSelector: React.FC<ResidueAndVariantsSelectorProps> = ({
  photo,
  variants,
  weight,
  selectedResidue,
  selectedVariant,
  selectedCondition,
  selectedPackage,
  setPhoto,
  setWeight,
  setCondition,
  setPackage,
  setResidue,
  setVariant,
}) => {
  const title = "Detalhe do Resíduo para Descarte";
  const description =
    "Escolha o resíduo, condição, quantidade, embalagem e uma data para coleta.";

  return (
    <View className="pt-4">
      <WasteManagementHeadingSection title={title} description={description} />
      <SingleResidueAndVariantsSection
        selectedResidue={selectedResidue}
        setResidue={setResidue}
        variants={variants}
        selectedVariant={selectedVariant}
        setVariant={setVariant}
      />
      <View className="space-y-6">
        <QuantityInput weight={weight} setWeight={setWeight} />
        <ResidueConditionSelector
          selectedCondition={selectedCondition}
          setSelectedCondition={setCondition}
        />
        <PackageAvailableSelector
          selectedPackage={selectedPackage}
          setSelectedPackage={setPackage}
        />
        <TakeResiduePhoto photo={photo || null} setPhoto={setPhoto} />
      </View>
    </View>
  );
};
export default SingleResidueSelector;
