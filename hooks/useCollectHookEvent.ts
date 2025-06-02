import { useAuth } from "@/context/AuthContext";
import { useCollectFlow } from "@/context/CollectFlowContext";
import { useCallback, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { useUser } from "@/context/UserContext";

export const useCollectEvent = () => {
  const { authState } = useAuth();
  const { user } = useUser();
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
    previousRegisteredAddressSelectedId,
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
      if (!token) {
        console.error("❌ Token missing");
        throw new Error("Usuário não autenticado");
      }

      const residuePayload = getResiduePayload?.();
      if (!residuePayload) throw new Error("Resíduo incompleto");

      const newDate = new Date(selectedDate || "");
      const [hour, minute] = (selectedHour || "00:00").split(":").map(Number);
      if (hour < 0 || hour >= 24 || minute < 0 || minute >= 60) {
        throw new Error("Hora ou minuto inválido");
      }
      newDate.setHours(hour, minute);
      const isoDateTime = newDate.toISOString();

      let addressId: string;

      // ✅ Use previously selected address if available
      if (previousRegisteredAddressSelectedId) {
        addressId = previousRegisteredAddressSelectedId;
        console.log("📍 Using previously selected address ID:", addressId);
      } else {
        // 🔍 Try to find an existing address first
        const addressPayload = {
          city,
          neighborhood,
          state,
          street,
          number,
          complement,
          postalCode,
        };

        console.log("📍 Searching for existing address:", addressPayload);
        const existingAddressRes = await axios.get(
          `${API_URL}/address/search`,
          {
            params: addressPayload,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
      }

      // 🧪 Create residue
      const createResidueRes = await axios.post(
        `${API_URL}/residues`,
        residuePayload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const finalResidueId = createResidueRes.data._id;
      console.log("✅ Created residue:", finalResidueId);

      const formattedResidue = residuePayload?.name || "Coleta";
      const formattedSingleResidueVariant =
        residuePayload?.variant || "Sem variante";
      const shortDate = newDate.toLocaleDateString("pt-BR");
      const shortTime = newDate.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const userName = user?.firstName?.split(" ")[0] || "Usuário";

      const dynamicEventName = `Coleta de ${formattedResidue}: ${formattedSingleResidueVariant} - ${userName}`;
      const dynamicDescription = `Coleta agendada por ${
        userName || "usuário"
      } para ${street}, ${number} - ${neighborhood}, ${city}, ${state} em ${shortDate} às ${shortTime}`;

      // 🗓 Create collect event
      const res = await axios.post(
        `${API_URL}/collect-event/create`,
        {
          residueIds: [finalResidueId],
          addressId,
          dateTime: isoDateTime,
          eventName: dynamicEventName,
          description: dynamicDescription,
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
    previousRegisteredAddressSelectedId,
    getResiduePayload,
    resetCollectFlow,
    API_URL,
  ]);

  return { handleSubmit, loading };
};
