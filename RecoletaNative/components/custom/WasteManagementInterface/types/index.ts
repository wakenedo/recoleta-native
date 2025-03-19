type ResidueConditionSelectorProps = {
  selectedCondition: string;
  setSelectedCondition: (value: string) => void;
};

type PackageAvailableSelectorProps = {
  selectedPackage: string;
  setSelectedPackage: (value: string) => void;
};

type QuantityInputProps = {
  quantity: string;
  setQuantity: (value: string) => void;
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

export {
  ResidueConditionSelectorProps,
  PackageAvailableSelectorProps,
  QuantityInputProps,
  Residue,
  SelectableResidueIconsProps,
};
