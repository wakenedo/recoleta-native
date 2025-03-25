import { useFlow } from "@/app/context/FlowContext";
import { Residue } from "@/components/custom/WasteManagementInterface/types";

export const useResidue = () => {
  const {
    selectedResidue,
    quantity,
    selectedCondition,
    selectedPackage,
    selectedDate,
    selectedHour,
    photo,
    setFlowData,
  } = useFlow();

  const setResidue = (residue: Residue | null) =>
    setFlowData({ selectedResidue: residue });
  const setQuantity = (q: string) => setFlowData({ quantity: q });
  const setCondition = (condition: string) =>
    setFlowData({ selectedCondition: condition });
  const setPackage = (pkg: string) => setFlowData({ selectedPackage: pkg });
  const setDate = (date: Date | null) => setFlowData({ selectedDate: date });
  const setHour = (hour: string | null) => setFlowData({ selectedHour: hour });
  const setPhoto = (p: string | null) => setFlowData({ photo: p });

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
