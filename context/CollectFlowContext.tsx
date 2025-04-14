import React, { createContext, useContext, useState } from "react";
import { Residue } from "@/components/custom/WasteManagementInterface/types";

interface CollectFlowState {
  selectedResidue: Residue | null;
  quantity: string;
  selectedCondition: string;
  selectedPackage: string;
  selectedDate: Date | null;
  selectedHour: string | null;
  photo: string | null;

  // Address Information
  address: string;
  city: string;
  postalCode: string;
  additionalInfo: string;

  // Methods
  setCollectFlowData: (data: Partial<CollectFlowState>) => void;
  resetCollectFlow: () => void;
}

const CollectFlowContext = createContext<CollectFlowState | undefined>(
  undefined
);

export const CollectFlowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<CollectFlowState>({
    // Residue default values
    selectedResidue: null,
    quantity: "",
    selectedCondition: "Limpo",
    selectedPackage: "Caixa de Papelão",
    selectedDate: null,
    selectedHour: null,
    photo: null,

    // Address default values
    address: "",
    city: "",
    postalCode: "",
    additionalInfo: "",

    setCollectFlowData: () => {},
    resetCollectFlow: () => {},
  });

  const setCollectFlowData = (data: Partial<CollectFlowState>) => {
    setState((prev) => ({ ...prev, ...data }));
  };

  const resetCollectFlow = () => {
    setState({
      selectedResidue: null,
      quantity: "",
      selectedCondition: "Limpo",
      selectedPackage: "Caixa de Papelão",
      selectedDate: null,
      selectedHour: null,
      photo: null,

      address: "",
      city: "",
      postalCode: "",
      additionalInfo: "",

      setCollectFlowData,
      resetCollectFlow,
    });
  };

  return (
    <CollectFlowContext.Provider
      value={{ ...state, setCollectFlowData, resetCollectFlow }}
    >
      {children}
    </CollectFlowContext.Provider>
  );
};

export const useCollectFlow = () => {
  const context = useContext(CollectFlowContext);
  if (!context) {
    throw new Error("useFlow must be used within a FlowProvider");
  }
  return context;
};
