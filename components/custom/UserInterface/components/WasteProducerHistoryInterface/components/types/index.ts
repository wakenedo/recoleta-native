import { User } from "@/types";
import { Collect } from "../../../UserArea/components/UserAreaWasteProducerActions/types";

interface CanceledCollectsProps {
  user: User | null;
  collects: any[];
  loading: boolean;
}

interface CompleteCollectsProps {
  user: User | null;
  collects: any[];
  loading: boolean;
}

interface ExpiredCollectsProps {
  user: User | null;
  collects: any[];
  loading: boolean;
}

interface HistoryCollectsCardProps {
  item: Collect;
}

interface ScheduledCollectsProps {
  user: User | null;
  collects: any[];
  loading: boolean;
}

export {
  CanceledCollectsProps,
  CompleteCollectsProps,
  ExpiredCollectsProps,
  HistoryCollectsCardProps,
  ScheduledCollectsProps,
};
