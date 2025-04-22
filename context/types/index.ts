import { Residue } from "@/components/custom/WasteManagementInterface/types";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userType: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  onGoogleLogin?: () => Promise<any>;
}

interface CollectFlowState {
  selectedResidue: Residue | null;
  weight: string;
  selectedCondition: string;
  selectedPackage: string;
  selectedDate: Date | null;
  selectedHour: string | null;
  photo: string | null;

  // Address Information
  neighborhood: string;
  state: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  postalCode: string;
  latitude?: number | string;
  longitude?: number | string;

  // Methods
  previousRegisteredAddressSelectedId: string | null;
  setCollectFlowData: (data: Partial<CollectFlowState>) => void;
  resetCollectFlow: () => void;
  resetAddressData: () => void;
  getResiduePayload: () => {
    name: string;
    weight: string;
    condition: string;
    pkg: string;
    photo: string | null;
  } | null;
}

export {
  AuthProps,
  CollectFlowState,
  // Add other types here as needed
};
