import { Residue } from "@/components/custom/WasteManagementInterface/types";
import React, { createContext, useContext, useState } from "react";

interface FlowState {
  // Residue Information
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
  setFlowData: (data: Partial<FlowState>) => void;
  resetFlow: () => void;
}

const FlowContext = createContext<FlowState | undefined>(undefined);

export const FlowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<FlowState>({
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

    setFlowData: () => {},
    resetFlow: () => {},
  });

  const setFlowData = (data: Partial<FlowState>) => {
    setState((prev) => ({ ...prev, ...data }));
  };

  const resetFlow = () => {
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

      setFlowData,
      resetFlow,
    });
  };

  return (
    <FlowContext.Provider value={{ ...state, setFlowData, resetFlow }}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow must be used within a FlowProvider");
  }
  return context;
};
