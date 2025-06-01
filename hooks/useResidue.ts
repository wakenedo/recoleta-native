import {
  Residue,
  ResidueVariant,
} from "@/components/custom/WasteManagementInterface/types";
import { useCollectFlow } from "@/context/CollectFlowContext";

export const useResidue = () => {
  const {
    selectedVariant,
    selectedResidue,
    weight,
    selectedCondition,
    selectedPackage,
    selectedDate,
    selectedHour,
    photo,
    pricePerKg,
    minWeightKg,
    estimatedValue,
    setCollectFlowData,
    getResiduePayload,
  } = useCollectFlow();

  const setVariant = (variant: ResidueVariant | null) =>
    setCollectFlowData({ selectedVariant: variant });

  const setResidue = (residue: Residue | null) =>
    setCollectFlowData({ selectedResidue: residue });

  const setWeight = (w: string) => setCollectFlowData({ weight: w });

  const setCondition = (condition: string) =>
    setCollectFlowData({ selectedCondition: condition });

  const setPackage = (pkg: string) =>
    setCollectFlowData({ selectedPackage: pkg });

  const setDate = (date: Date | null) =>
    setCollectFlowData({ selectedDate: date });

  const setHour = (hour: string | null) =>
    setCollectFlowData({ selectedHour: hour });

  const setPhoto = (p: string | null) => setCollectFlowData({ photo: p });

  const isResidueValid =
    !!selectedResidue?.name &&
    !!selectedVariant?.label &&
    !!selectedVariant?.pricePerKg &&
    !!selectedVariant?.minWeightKg &&
    weight &&
    selectedCondition &&
    selectedPackage &&
    selectedHour &&
    selectedDate;

  return {
    selectedVariant,
    selectedResidue,
    weight,
    selectedCondition,
    selectedPackage,
    selectedDate,
    selectedHour,
    photo,
    pricePerKg,
    minWeightKg,
    estimatedValue,
    setVariant,
    setResidue,
    setWeight,
    setCondition,
    setPackage,
    setDate,
    setHour,
    setPhoto,
    isResidueValid,
    payloadResidue: getResiduePayload(), // inclui pricePerKg, estimatedValue...
  };
};
