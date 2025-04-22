import React, { createContext, useContext, useState } from "react";
import { CollectFlowState } from "./types";

const CollectFlowContext = createContext<CollectFlowState | undefined>(
  undefined
);

export const CollectFlowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<
    Omit<
      CollectFlowState,
      | "setCollectFlowData"
      | "resetCollectFlow"
      | "getResiduePayload"
      | "resetAddressData"
    >
  >({
    selectedResidue: null,
    weight: "",
    selectedCondition: "Limpo",
    selectedPackage: "Caixa de Papelão",
    selectedDate: null,
    selectedHour: null,
    photo: null,
    previousRegisteredAddressSelectedId: null,

    city: "",
    neighborhood: "",
    state: "",
    street: "",
    number: "",
    complement: "",
    postalCode: "",
  });

  const setCollectFlowData = (data: Partial<CollectFlowState>) => {
    setState((prev) => ({ ...prev, ...data }));
  };

  const resetCollectFlow = () => {
    setState({
      selectedResidue: null,
      weight: "",
      selectedCondition: "Limpo",
      selectedPackage: "Caixa de Papelão",
      selectedDate: null,
      selectedHour: null,
      photo: null,
      previousRegisteredAddressSelectedId: null,

      city: "",
      neighborhood: "",
      state: "",
      street: "",
      number: "",
      complement: "",
      postalCode: "",
    });
  };
  // Resets only address-related fields (and clears a previously selected address)
  const resetAddressData = () => {
    setState((prev) => ({
      ...prev,
      previousRegisteredAddressSelectedId: null,
      city: "",
      neighborhood: "",
      state: "",
      street: "",
      number: "",
      complement: "",
      postalCode: "",
      latitude: undefined,
      longitude: undefined,
    }));
  };

  const getResiduePayload = () => {
    if (!state.selectedResidue) return null;

    return {
      name: state.selectedResidue.name,
      weight: state.weight,
      condition: state.selectedCondition,
      pkg: state.selectedPackage,
      photo: state.photo,
    };
  };

  console.log("CollectFlowProvider state:", state);

  return (
    <CollectFlowContext.Provider
      value={{
        ...state,
        setCollectFlowData,
        resetCollectFlow,
        getResiduePayload,
        resetAddressData, // 👈 exposed here
      }}
    >
      {children}
    </CollectFlowContext.Provider>
  );
};

export const useCollectFlow = () => {
  const context = useContext(CollectFlowContext);
  if (!context) {
    throw new Error("useCollectFlow must be used within a CollectFlowProvider");
  }
  return context;
};
