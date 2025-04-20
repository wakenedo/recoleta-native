interface AddNewAddressProps {
  latitude?: number | string;
  longitude?: number | string;
  postalCode: string;
  number: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  setLatitude?: (value: number) => void;
  setLongitude?: (value: number) => void;
  setPostalCode: (value: string) => void;
  setNumber: (value: string) => void;
  setStreet: (value: string) => void;
  setComplement: (value: string) => void;
  setNeighborhood: (value: string) => void;
  setCity: (value: string) => void;
  setState: (value: string) => void;
}

interface AddNewAddressFormProps {
  postalCode: string;
  number: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  setPostalCode: (value: string) => void;
  setNumber: (value: string) => void;
  setStreet: (value: string) => void;
  setComplement: (value: string) => void;
  setNeighborhood: (value: string) => void;
  setCity: (value: string) => void;
  setState: (value: string) => void;
}

interface Address {
  _id: string;
  postalCode: string;
  number: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
  createdAt?: string;
  updatedAt?: string;
}

export { AddNewAddressProps, AddNewAddressFormProps, Address };
