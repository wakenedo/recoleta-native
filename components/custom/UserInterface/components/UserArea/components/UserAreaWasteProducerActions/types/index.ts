import { Address } from "@/components/custom/AddressInterface/types";
import { Residue } from "@/components/custom/WasteManagementInterface/types";

interface Collect {
  createdAt: string;
  createdBy: string;
  isSigned: boolean;
  dateTime: string;
  description: string;
  eventName: string;
  updatedAt: string;
  _id: string;
  status: string;

  completedBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;

  signedBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  address: {
    city: string;
    complement?: string;
    neighborhood: string;
    state: string;
    street: string;
    number: string;
    postalCode: string;
    latitude?: number | string;
    longitude?: number | string;
  };

  residues: [
    {
      condition: string;
      createdAt: string;
      name: string;
      photo: string | null;
      pkg: string;
      weight: number | null;
      _id: string;
    }
  ];
}

interface WasteProducerUserResiduesProps {
  residues: Residue[];
  visible: boolean;
  onClose: () => void;
  loading?: boolean;
  error: string | null;
}

interface WasteProducerUserCollectsProps {
  collects: Collect[];
  visible: boolean;
  onClose: () => void;
  loading?: boolean;
  error: string | null;
}

interface WasteProducerUserAddressesProps {
  addresses: Address[];
  visible: boolean;
  onClose: () => void;
  loading?: boolean;
  error: string | null;
}

interface UserRegisteredResidueCardProps {
  item: Residue;
}

interface UserRegisteredCollectsCardProps {
  item: Collect;
}

interface UserRegisteredAddressCardProps {
  item: Address;
}

export {
  Collect,
  WasteProducerUserResiduesProps,
  WasteProducerUserCollectsProps,
  WasteProducerUserAddressesProps,
  UserRegisteredResidueCardProps,
  UserRegisteredCollectsCardProps,
  UserRegisteredAddressCardProps,

  // Add other types here as needed
};
