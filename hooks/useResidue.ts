import { Residue } from "@/components/custom/WasteManagementInterface/types";
import { useCollectFlow } from "@/context/CollectFlowContext";

export const useResidue = () => {
  const {
    selectedResidue,
    weight,
    selectedCondition,
    selectedPackage,
    selectedDate,
    selectedHour,
    photo,
    setCollectFlowData,
    getResiduePayload,
  } = useCollectFlow();

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
    weight &&
    selectedCondition &&
    selectedPackage &&
    selectedHour &&
    selectedDate;

  return {
    selectedResidue,
    weight,
    selectedCondition,
    selectedPackage,
    selectedDate,
    selectedHour,
    photo,
    setResidue,
    setWeight,
    setCondition,
    setPackage,
    setDate,
    setHour,
    setPhoto,
    isResidueValid,
    payloadResidue: getResiduePayload(), // 🔥 easy
  };
};
