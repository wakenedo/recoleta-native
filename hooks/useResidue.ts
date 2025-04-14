import { Residue } from "@/components/custom/WasteManagementInterface/types";
import { useCollectFlow } from "@/context/CollectFlowContext";

export const useResidue = () => {
  const {
    selectedResidue,
    quantity,
    selectedCondition,
    selectedPackage,
    selectedDate,
    selectedHour,
    photo,
    setCollectFlowData,
  } = useCollectFlow();

  const setResidue = (residue: Residue | null) =>
    setCollectFlowData({ selectedResidue: residue });
  const setQuantity = (q: string) => setCollectFlowData({ quantity: q });
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
    !!selectedResidue?.id && quantity && selectedCondition && selectedPackage;

  return {
    selectedResidue,
    quantity,
    selectedCondition,
    selectedPackage,
    selectedDate,
    selectedHour,
    photo,
    setResidue,
    setQuantity,
    setCondition,
    setPackage,
    setDate,
    setHour,
    setPhoto,
    isResidueValid,
  };
};
