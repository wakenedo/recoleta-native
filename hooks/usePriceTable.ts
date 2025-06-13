import { useEffect, useState } from "react";
import Constants from "expo-constants";

type Variant = {
  label: string;
  pricePerKg: number;
  minWeightKg: number;
  commission30Percent: number;
};

type Category = {
  variants: Variant[];
};

type PriceTable = {
  [category: string]: Category;
};

const { API_URL } = Constants.expoConfig?.extra || {};

export function usePriceTable(token?: string | null, region?: string) {
  const [priceTable, setPriceTable] = useState<PriceTable | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchPriceTable = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/price-tables/${region}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();
        setPriceTable(json);
        setError(null);
      } catch (err: any) {
        console.warn("[usePriceTable] Erro ao buscar tabela de preços:", err);
        setError(err);
        setPriceTable(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceTable();
  }, [token]);

  return { priceTable, loading, error };
}
