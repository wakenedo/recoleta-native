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
  weight?: number;
  _id?: string;

  // Campos calculados (opcionais, preenchidos pelo backend)
  variants?: ResidueVariant[]; // <-- novo
};

type SelectableResidueIconsProps = {
  selectedResidue: Residue | null;
  setSelectedResidue: (residue: Residue) => void;
  selectedVariant?: ResidueVariant | null;
  setSelectedVariant?: (variant: ResidueVariant | null) => void;
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
};
