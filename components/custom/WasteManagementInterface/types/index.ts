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

type Residue = {
  id: string;
  name: string;
  image: string;
  alt: string;
};

type SelectableResidueIconsProps = {
  selectedResidue: Residue | null;
  setSelectedResidue: (residue: Residue) => void;
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
};
