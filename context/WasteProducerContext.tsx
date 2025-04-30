import React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import { Address } from "@/components/custom/AddressInterface/types";
import Constants from "expo-constants";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { WasteProducerContextProps } from "./types";

const WasteProducerContext = createContext<
  WasteProducerContextProps | undefined
>(undefined);

export const WasteProducerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { authState } = useAuth();
  const { LOCAL_API_URL } = Constants.expoConfig?.extra || {};

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [residues, setResidues] = useState<any[]>([]);
  const [collects, setCollects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get<Address[]>(`${LOCAL_API_URL}/address/user`, {
        headers: { Authorization: `Bearer ${authState?.token}` },
      });
      setAddresses(res.data);
    } catch (err: any) {
      console.error(
        "Erro ao buscar endereços:",
        err?.response?.data || err.message
      );
      setError("Erro ao carregar endereços.");
    } finally {
      setLoading(false);
    }
  }, [LOCAL_API_URL, authState?.token]);

  const fetchResidues = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${LOCAL_API_URL}/residues/user`, {
        headers: { Authorization: `Bearer ${authState?.token}` },
      });
      setResidues(res.data);
    } catch (err: any) {
      console.error(
        "Erro ao buscar resíduos:",
        err?.response?.data || err.message
      );
      setError("Erro ao carregar resíduos.");
    } finally {
      setLoading(false);
    }
  }, [LOCAL_API_URL, authState?.token]);

  const fetchCollects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${LOCAL_API_URL}/collect-event/user/events`,
        {
          headers: { Authorization: `Bearer ${authState?.token}` },
        }
      );
      setCollects(res.data);
    } catch (err: any) {
      console.error(
        "Erro ao buscar coletas:",
        err?.response?.data || err.message
      );
      setError("Erro ao carregar coletas.");
    } finally {
      setLoading(false);
    }
  }, [LOCAL_API_URL, authState?.token]);

  const resetError = () => setError(null);

  return (
    <WasteProducerContext.Provider
      value={{
        addresses,
        residues,
        collects,
        loading,
        error,
        fetchAddresses,
        fetchResidues,
        fetchCollects,
        resetError,
      }}
    >
      {children}
    </WasteProducerContext.Provider>
  );
};

export const useWasteProducer = () => {
  const context = useContext(WasteProducerContext);
  if (context === undefined) {
    throw new Error(
      "useWasteProducer must be used within a WasteProducerProvider"
    );
  }
  return context;
};
