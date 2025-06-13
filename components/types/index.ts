import { User } from "@/types";
import { ReactNode } from "react";

interface GearButtonProps {
  setShowActions: (showActions: boolean) => void;
  showActions: boolean;
  isProducesWaste: boolean;
  isCollectsWaste: boolean;
}

interface InterfaceSwitchProps {
  rightLabel: string;
  leftLabel: string;
  rightComponent: ReactNode;
  leftComponent: ReactNode;
  value: boolean; // Controlled value
  onToggleChange?: (value: boolean) => void;
}

interface BackToHomeButtonProps {
  user: User | null;
}

interface ResidueModalFlowProps {
  visible: boolean;
  onClose: () => void;
}

type RegionPriceTableProps = {
  token: string | undefined | null;
  region: string;
};

interface UserInterfaceProps {
  user: User;
  onLogout: (() => Promise<any>) | undefined;
}

type UserTypePickerProps = {
  onSelect: (userType: "COLLECTS_WASTE" | "PRODUCES_WASTE") => void;
};

export {
  UserTypePickerProps,
  RegionPriceTableProps,
  ResidueModalFlowProps,
  GearButtonProps,
  BackToHomeButtonProps,
  InterfaceSwitchProps,
  UserInterfaceProps,
};
