import { useAuth } from "@/context/AuthContext";
import { useCollectFlow } from "@/context/CollectFlowContext";
import { useCallback, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

export const useCollectEvent = () => {
  const { authState } = useAuth();
  const {
    selectedDate,
    selectedHour,
    city,
    neighborhood,
    state,
    street,
    number,
    complement,
    postalCode,
    getResiduePayload,
    resetCollectFlow,
  } = useCollectFlow();

  const { API_URL } = Constants.expoConfig?.extra || {};

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      console.log("📦 Starting collect event creation flow");

      const token = authState?.token;
      console.log("🔑 Token:", token);
      if (!token) {
        console.error("❌ Token missing");
        throw new Error("Usuário não autenticado");
      }
      console.log("🔑 Using token:", token);

      const residuePayload = getResiduePayload?.();
      if (!residuePayload) throw new Error("Resíduo incompleto");

      console.log("📅 Selected date:", selectedDate);
      console.log("🕒 Selected hour:", selectedHour);

      const newDate = new Date(selectedDate || "");
      const [hour, minute] = (selectedHour || "00:00").split(":").map(Number);
      if (hour < 0 || hour >= 24 || minute < 0 || minute >= 60) {
        throw new Error("Hora ou minuto inválido");
      }
      newDate.setHours(hour, minute);
      const isoDateTime = newDate.toISOString();
      console.log("📆 Final datetime (ISO):", isoDateTime);

      const addressPayload = {
        city,
        neighborhood,
        state,
        street,
        number,
        complement,
        postalCode,
      };

      console.log("📍 Checking for existing address:", addressPayload);
      const existingAddressRes = await axios.get(`${API_URL}/address/search`, {
        params: addressPayload,
        headers: { Authorization: `Bearer ${token}` },
      });

      let addressId;
      if (
        existingAddressRes.data &&
        Array.isArray(existingAddressRes.data) &&
        existingAddressRes.data.length > 0
      ) {
        addressId = existingAddressRes.data[0]._id;
        console.log("✅ Found existing address:", addressId);
      } else {
        console.log("➕ Creating new address...");
        const createAddressRes = await axios.post(
          `${API_URL}/address`,
          addressPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        addressId = createAddressRes.data._id;
        console.log("✅ Created new address:", addressId);
      }

      console.log("🧪 Creating residue (no search):", residuePayload);
      const createResidueRes = await axios.post(
        `${API_URL}/residues`,
        residuePayload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const finalResidueId = createResidueRes.data._id;
      console.log("✅ Created residue:", finalResidueId);

      console.log("📤 Creating collect event with:");
      console.log({
        residueIds: [finalResidueId],
        addressId,
        dateTime: isoDateTime,
      });

      const res = await axios.post(
        `${API_URL}/collect-event/create`,
        {
          residueIds: [finalResidueId],
          addressId,
          dateTime: isoDateTime,
          eventName: "Nova coleta",
          description: "Evento de coleta criado pelo usuário",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("✅ Collect event created successfully:", res.data);

      resetCollectFlow?.();
      return true;
    } catch (error: any) {
      console.error(
        "❌ Erro ao criar evento de coleta:",
        error.response?.data || error.message
      );
      return false;
    } finally {
      setLoading(false);
      console.log("🔚 handleSubmit finished");
    }
  }, [
    authState?.token,
    selectedDate,
    selectedHour,
    city,
    neighborhood,
    state,
    street,
    number,
    complement,
    postalCode,
    getResiduePayload,
  ]);

  return { handleSubmit, loading };
};
