import React, { createContext, useContext, useEffect, useState } from "react";
import { CollectFlowState } from "./types";
import { Residue } from "@/components/custom/WasteManagementInterface/types";

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
      | "getResiduesPayloadArray"
      | "resetAddressData"
    >
  >({
    selectedResidues: [], // Initialize selectedResidues as an empty array
    residues: [], // Initialize residues as null
    selectedResidue: null,
    selectedVariant: null,
    weight: "",
    pricePerKg: null,
    minWeightKg: null,
    estimatedValue: null,
    selectedCondition: "Limpo",
    selectedPackage: "Caixa de Papelão",
    selectedDate: null,
    selectedHour: null,
    photo: null,
    previousRegisteredAddressSelectedId: null,
    status: "",
    isSigned: false,
    signedBy: null,
    latitude: undefined, // or null
    longitude: undefined,
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
      residues: [],
      selectedResidues: [], // Initialize selectedResidues as an empty array
      selectedResidue: null,
      selectedVariant: null,
      weight: "",
      pricePerKg: null,
      minWeightKg: null,
      estimatedValue: null,
      selectedCondition: "Limpo",
      selectedPackage: "Caixa de Papelão",
      selectedDate: null,
      selectedHour: null,
      photo: null,
      previousRegisteredAddressSelectedId: null,
      status: "",
      isSigned: false,
      signedBy: null,
      latitude: undefined, // or null
      longitude: undefined,

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

  useEffect(() => {
    if (state.selectedVariant && state.weight) {
      const weightNum = parseFloat(state.weight);
      if (!isNaN(weightNum)) {
        const { pricePerKg, minWeightKg } = state.selectedVariant;
        const estimatedValue =
          weightNum >= minWeightKg ? weightNum * pricePerKg : 0;

        setState((prev) => ({
          ...prev,
          pricePerKg,
          minWeightKg,
          estimatedValue: parseFloat(estimatedValue.toFixed(2)),
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        pricePerKg: null,
        minWeightKg: null,
        estimatedValue: null,
      }));
    }
  }, [state.selectedVariant, state.weight]);

  const getResiduePayload = () => {
    if (!state.selectedResidue) return null;

    return {
      name: state.selectedResidue.name,
      apiName: state.selectedResidue.apiName,
      variant: state.selectedVariant ? state.selectedVariant.label : null,
      weight: state.weight,
      condition: state.selectedCondition,
      pkg: state.selectedPackage,
      photo: state.photo,
    };
  };

  const getResiduesPayloadArray = (residues: any) => {
    return (
      residues?.map((r: Residue) => ({
        name: r.name,
        apiName: r.apiName,
        variant: r.variant?.label || null,
        weight: r.weight,
        condition: r.condition, // ensure these fields exist on ResidueWithDetails
        pkg: r.pkg,
        photo: r.photo || null,
      })) ?? []
    );
  };

  console.log("CollectFlowProvider state:", state);

  return (
    <CollectFlowContext.Provider
      value={{
        ...state,
        setCollectFlowData,
        resetCollectFlow,
        getResiduePayload: () => getResiduePayload(),
        getResiduesPayloadArray: () => getResiduesPayloadArray(state.residues),
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
