type ResidueConditionSelectorProps = {
  selectedCondition: string;
  setSelectedCondition: (value: string) => void;
};

type PackageAvailableSelectorProps = {
  selectedPackage: string;
  setSelectedPackage: (value: string) => void;
};

type QuantityInputProps = {
  weight: string;
  setWeight: (value: string) => void;
  inputBackgroundColor?: string; // opcional, para personalização
};

type ResidueVariant = {
  label: string;
  pricePerKg: number;
  minWeightKg: number;
  commission30Percent: number;
};

type ResidueVariantsResponse = {
  variants: ResidueVariant[];
};

type Residue = {
  id: string;
  name: string;
  apiName: string;
  image: string;
  alt: string;
  photo?: string | null; // <-- opcional, pode ser preenchido pelo usuário
  weight?: number;
  condition?: string;
  pkg?: string;
  _id?: string;

  // Campos calculados (opcionais, preenchidos pelo backend)
  variant?: ResidueVariant | null; // <-- opcional, pode ser preenchido pelo usuário
  variants?: ResidueVariant[]; // <-- novo
};

type SelectableResidueIconsProps = {
  photo: string | null;
  selectedResidue: Residue | null;
  weight: string;
  selectedCondition: string;
  selectedPackage: string;
  selectedVariant: ResidueVariant | null;
  isMultipleResidues?: boolean;
  setPhoto: (photo: string | null) => void;
  setPackage: (pkg: string) => void;
  setCondition: (condition: string) => void;
  setWeight: (w: string) => void;
  setResidue: (residue: Residue | null) => void;
  setVariant: (variant: ResidueVariant | null) => void;
  getResiduesAsArray: () => Residue[];
  setResidues: (residues: Residue[]) => void;
};

type AvailableDateProps = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
};

type ScheduleHourProps = {
  selectedHour: string | null;
  selectedDate: Date | null;
  setSelectedHour: (hour: string) => void;
};

type TakeResiduePhotoProps = {
  photo: string | null;
  setPhoto: (photo: string) => void;
};

type SavedResiduesSectionProps = {
  residues: Residue[] | undefined;
  handleRemove: (variantLabel: string | undefined) => void;
  calculatePrice: (variant: ResidueVariant | null, weight: string) => string;
};

type ResidueAndVariantsSelectorProps = {
  photo: string | null;
  variants: ResidueVariant[];
  weight: string;
  selectedCondition: string;
  selectedPackage: string;
  selectedVariant: ResidueVariant | null;
  selectedResidue: Residue | null;
  setPackage: (pkg: string) => void;
  setCondition: (condition: string) => void;
  setResidue: (residue: Residue | null) => void;
  setResidues?: (residues: Residue[]) => void;
  handleSave?: () => void;
  setWeight: (w: string) => void;
  setPhoto: (photo: string | null) => void;
  setVariant: (variant: ResidueVariant | null) => void;
};

type WasteManagementHeadingSectionProps = {
  title: string;
  description: string;
};

export {
  TakeResiduePhotoProps,
  ScheduleHourProps,
  AvailableDateProps,
  ResidueConditionSelectorProps,
  PackageAvailableSelectorProps,
  QuantityInputProps,
  Residue,
  SelectableResidueIconsProps,
  ResidueVariant,
  ResidueVariantsResponse,
  SavedResiduesSectionProps,
  ResidueAndVariantsSelectorProps,
  WasteManagementHeadingSectionProps,
};
