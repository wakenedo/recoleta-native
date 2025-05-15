import React, { createContext, useContext, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import Constants from "expo-constants";
import axios from "axios";

export type EventSummary = {
  total: number;
  completed: number;
  expired: number;
  canceled: number;
  scheduled: number;
};

export type ResidueStat = {
  name: string;
  count: number;
  totalQuantity: number;
};

export type GroupedResidueStat = {
  type: string;
  totalQuantity: number;
  count: number;
};

type Residue = {
  name: string;
  quantity: number;
};

export type EventDetail = {
  eventId: string;
  eventName: string;
  dateTime: string;
  status: string;
  residues: Residue[];
};

interface WasteProducerStatsContextProps {
  loading: boolean;
  error: string | null;
  summary: EventSummary | null;
  residueRanking: ResidueStat[];
  residueGroupedByType: GroupedResidueStat[];
  events: EventDetail[];
  fetchStats: (from?: string, to?: string) => Promise<void>;
}

const WasteProducerStatsContext = createContext<
  WasteProducerStatsContextProps | undefined
>(undefined);

export const WasteProducerStatsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { LOCAL_API_URL, API_URL } = Constants.expoConfig?.extra || {};
  const { authState } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<EventSummary | null>(null);
  const [residueRanking, setResidueRanking] = useState<ResidueStat[]>([]);
  const [residueGroupedByType, setGroupedByType] = useState<
    GroupedResidueStat[]
  >([]);
  const [events, setEvents] = useState<EventDetail[]>([]);

  const fetchStats = useCallback(
    async (from?: string, to?: string) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${LOCAL_API_URL}/statistics/producer`,
          {
            headers: { Authorization: `Bearer ${authState?.token}` },
            params: { from, to },
          }
        );

        const { summary, events, residueRanking, residueGroupedByType } =
          response.data;

        setSummary(summary);
        setEvents(events);
        setResidueRanking(residueRanking);
        setGroupedByType(residueGroupedByType);
        setError(null);
      } catch (err: any) {
        console.error(
          "Failed to fetch stats:",
          err?.response?.data || err.message
        );
        setError("Erro ao carregar estatísticas.");
      } finally {
        setLoading(false);
      }
    },
    [LOCAL_API_URL, authState?.token]
  );

  return (
    <WasteProducerStatsContext.Provider
      value={{
        loading,
        error,
        summary,
        residueRanking,
        residueGroupedByType,
        events,
        fetchStats,
      }}
    >
      {children}
    </WasteProducerStatsContext.Provider>
  );
};

export const useWasteProducerStats = () => {
  const context = useContext(WasteProducerStatsContext);
  if (!context) {
    throw new Error(
      "useWasteProducerStats must be used within WasteProducerStatsProvider"
    );
  }
  return context;
};
