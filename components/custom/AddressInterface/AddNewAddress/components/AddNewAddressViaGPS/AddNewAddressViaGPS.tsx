import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";
import * as Location from "expo-location";
import { useAddress } from "@/hooks/useAddress";

const AddNewAddressViaGPS = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    setLatitude,
    setLongitude,
    setStreet,
    setCity,
    setState,
    setPostalCode,
    setNeighborhood,
    setNumber,
    setComplement,
  } = useAddress();

  const handleGetLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    setSuccess(false);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLatitude(latitude);
      setLongitude(longitude);

      const [address] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (address) {
        setStreet(address.street || "");
        setNumber(address.name || "");
        setCity(address.city || "");
        setState(address.region || "");
        setPostalCode(address.postalCode || "");
        setNeighborhood(address.district || "");
        setComplement(address.subregion || "");
        setSuccess(true);
      }
    } catch (error) {
      setErrorMsg("Erro ao obter localização.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text className="text-md font-bold text-slate-800">
        Usar localização atual
      </Text>

      {!success && (
        <View>
          {loading ? (
            <ActivityIndicator style={{ marginVertical: 12 }} />
          ) : (
            <View className="mb-2 mt-2">
              <Button
                title="Usar Minha Localização"
                onPress={handleGetLocation}
              />
            </View>
          )}
        </View>
      )}

      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
      {success && (
        <Text style={styles.successText}>Endereço preenchido com sucesso.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    marginTop: 10,
    color: "red",
  },
  successText: {
    marginTop: 10,
    color: "green",
    fontWeight: "500",
  },
});

export default AddNewAddressViaGPS;
