import { User } from "@/types";

interface CalendarInterfaceProps {
  user: User | null;
}

interface WasteProducerHistoryProps {
  user: User | null;
}

interface UserActionsInterfaceProps {
  user: User;
}

interface UserAreaProps {
  user: User;
}

interface WasteProducerActionsProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

interface UserCenterProps {
  user: User;
  onLogout: (() => Promise<any>) | undefined;
}

interface WasteProducerStatsInterfaceProps {
  user: User | null;
}

interface ResidueStatsByStatus {
  [status: string]: {
    [name: string]: {
      count: number;
      totalQuantity: number;
    };
  };
}

export {
  WasteProducerStatsInterfaceProps,
  ResidueStatsByStatus,
  WasteProducerHistoryProps,
  UserCenterProps,
  UserAreaProps,
  CalendarInterfaceProps,
  UserActionsInterfaceProps,
  WasteProducerActionsProps,
};
