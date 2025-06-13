import { EventDetail } from "@/context/WasteProducerStatsContext";
import { User } from "@/types";

interface AccountSectionProps {
  user: User | null;
  loading: boolean;
  events: EventDetail[];
}

interface CollectStats {
  status: string;
  count: number;
  avgQuantity: number;
  successRate: number;
  expiredRate: number;
  canceledRate: number;
  scheduled: number;
  completed: number;
}

interface CollectsSectionProps {
  user: User | null;
  loading: boolean;
  collectStats: CollectStats[];
}

interface StatsResidue {
  name: string;
  totalQuantity: number;
  count: number;
}

interface ResidueStatsByStatus {
  [status: string]: {
    [name: string]: {
      count: number;
      totalQuantity: number;
    };
  };
}

interface ResiduesSectionProps {
  user: User | null;
  loading: boolean;
  residueStatsPerStatus: ResidueStatsByStatus;
  summary: {
    completed: number;
    expired: number;
    scheduled: number;
    canceled: number;
    total: number;
  };
}

export {
  AccountSectionProps,
  CollectsSectionProps,
  CollectStats,
  StatsResidue,
  ResidueStatsByStatus,
  ResiduesSectionProps,
};
