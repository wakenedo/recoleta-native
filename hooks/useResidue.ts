import {
  Residue,
  ResidueVariant,
} from "@/components/custom/WasteManagementInterface/types";
import { useCollectFlow } from "@/context/CollectFlowContext";

export const useResidue = () => {
  const {
    residues,
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
    getResiduesPayloadArray,
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

  const isResiduesValid = (residues: Residue[] | undefined): boolean => {
    if (!residues || residues.length === 0) return false;

    return residues.every(
      (r) =>
        !!r.name &&
        !!r.variant?.label &&
        !!r.variant?.pricePerKg &&
        !!r.variant?.minWeightKg &&
        !!r.weight &&
        !!r.condition &&
        !!r.pkg
    );
  };

  const setResidues = (r: Residue[]) => setCollectFlowData({ residues: r });

  const getResiduesAsArray = (): Residue[] => residues ?? [];

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
    setResidues, // função para definir os resíduos
    setVariant,
    setResidue,
    setWeight,
    setCondition,
    setPackage,
    setDate,
    setHour,
    setPhoto,
    isResidueValid,
    isResiduesValid,
    payloadResidue: getResiduePayload(), // inclui pricePerKg, estimatedValue...
    payloadResiduesArray: getResiduesPayloadArray(),
    getResiduesAsArray, // função para obter os resíduos como array
  };
};
