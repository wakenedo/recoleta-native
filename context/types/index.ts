import { User } from "@/app/Home";
import { Address } from "@/components/custom/AddressInterface/types";
import {
  Residue,
  ResidueVariant,
} from "@/components/custom/WasteManagementInterface/types";
import { AxiosResponse } from "axios";

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
  onGoogleLogin?: (
    onProfileUpdate?: (photo: string | undefined) => void
  ) => Promise<
    | AxiosResponse<any, any>
    | {
        error: boolean;
        msg: string;
      }
  >;
  loadUser?: (
    setUser: (value: React.SetStateAction<User | null>) => void,
    setLoading: (value: React.SetStateAction<boolean>) => void,
    token?: string | null
  ) => Promise<void>;
  verifyEmail?: (token: string) => Promise<
    | {
        success: boolean;
        msg: any;
        error?: undefined;
      }
    | {
        error: boolean;
        msg: any;
        success?: undefined;
      }
  >;
}

interface CollectFlowState {
  selectedResidue: Residue | null;
  selectedVariant: ResidueVariant | null;
  pricePerKg: number | null;
  minWeightKg: number | null;
  estimatedValue: number | null;
  weight: string;
  selectedCondition: string;
  selectedPackage: string;
  selectedDate: Date | null;
  selectedHour: string | null;
  photo: string | null;
  status?: string;
  isSigned?: boolean;
  signedBy?: User | null;
  completedBy?: [User] | null;
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

interface WasteProducerContextProps {
  addresses: Address[];
  residues: any[];
  collects: any[];
  loading: boolean;
  error: string | null;
  fetchAddresses: () => Promise<void>;
  fetchResidues: () => Promise<void>;
  fetchCollects: () => Promise<void>;
  resetError: () => void;
}

interface GoogleProfile {
  photo?: string | null;
}

export {
  AuthProps,
  CollectFlowState,
  WasteProducerContextProps,
  GoogleProfile,
  // Add other types here as needed
};
