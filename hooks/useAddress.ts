import { useCollectFlow } from "@/context/CollectFlowContext";

export const useAddress = () => {
  const {
    neighborhood,
    state,
    street,
    number,
    complement,
    city,
    postalCode,
    latitude,
    longitude,
    setCollectFlowData,
  } = useCollectFlow();

  const isAddressValid = !!street && !!number && !!city && !!postalCode;

  // ✅ NEW: Full payload for backend
  const addressPayload = {
    street,
    number,
    city,
    postalCode,
    neighborhood,
    state,
    complement,
    latitude,
    longitude,
  };

  return {
    neighborhood,
    latitude,
    longitude,
    state,
    street,
    number,
    complement,
    city,
    postalCode,
    isAddressValid,
    addressPayload, // ✅ for API call
    setLatitude: (latitude: number) => setCollectFlowData({ latitude }),
    setLongitude: (longitude: number) => setCollectFlowData({ longitude }),
    setNeighborhood: (neighborhood: string) =>
      setCollectFlowData({ neighborhood }),
    setState: (state: string) => setCollectFlowData({ state }),
    setStreet: (street: string) => setCollectFlowData({ street }),
    setNumber: (number: string) => setCollectFlowData({ number }),
    setComplement: (complement: string) => setCollectFlowData({ complement }),
    setCity: (city: string) => setCollectFlowData({ city }),
    setPostalCode: (postalCode: string) => setCollectFlowData({ postalCode }),
  };
};
