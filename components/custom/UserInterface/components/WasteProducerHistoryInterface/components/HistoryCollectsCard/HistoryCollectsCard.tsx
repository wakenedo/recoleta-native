import React, { FC } from "react";
import { View, Image, Text } from "react-native";
import { Card } from "@/components/ui/card";
import { Collect } from "../../../UserArea/components/UserAreaWasteProducerActions/types";

interface HistoryCollectsCardProps {
  item: Collect;
}

const HistoryCollectsCard: FC<HistoryCollectsCardProps> = ({ item }) => {
  if (!item.residues?.[0] || !item.address) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const singleResidue = item.residues[0];
  const formattedCreatedAt = formatDate(item.createdAt);
  const formattedCreatedTime = formatTime(item.createdAt);
  const formattedFinalDate = formatDate(item.dateTime);
  const formattedFinalTime = formatTime(item.dateTime);
  const singleResidueVariant = item.residues[0].variant
    ? item.residues[0].variant
    : false;
  const singleResidueVariantEstimatedValue = item.residues[0].estimatedValue
    ? item.residues[0].estimatedValue
    : null;
  const singleResidueVariantPricePerKg = item.residues[0].pricePerKg
    ? item.residues[0].pricePerKg
    : null;

  return (
    <Card className="mb-4 p-4 rounded-2xl shadow bg-slate-100">
      <View className="mb-3">
        <Text className="text-lg font-bold text-gray-800">
          {item.eventName}
        </Text>
        <Text className="text-sm text-gray-500">
          Status: <Text className="font-semibold">{item.status}</Text>
        </Text>
        <Text className="text-sm text-gray-500">
          Assinado: {item.isSigned ? "Sim" : "Não"}
        </Text>

        {item.isSigned && item.signedBy && (
          <Text className="text-sm text-gray-500">
            Por: {item.signedBy.firstName} {item.signedBy.email}
          </Text>
        )}

        {item.completedBy && (
          <Text className="text-sm text-gray-500">
            Coletado por: {item.completedBy.firstName} {item.completedBy.email}
          </Text>
        )}

        <Text className="text-sm text-gray-500">
          Criado por: {item.createdBy}
        </Text>
        <Text className="text-sm text-gray-500">
          Criado em: {formattedCreatedAt} às {formattedCreatedTime}
        </Text>
        <Text className="text-sm text-gray-500">
          Data final: {formattedFinalDate} às {formattedFinalTime}
        </Text>
      </View>

      <View className="mb-3">
        <Text className="font-semibold text-gray-700 mb-1">Resíduo</Text>
        <Text className="text-sm text-gray-500">
          Nome: {singleResidue.name}
        </Text>
        {singleResidueVariant && (
          <Text className="text-sm text-gray-500">
            Tipo: {singleResidue.variant}
          </Text>
        )}
        <Text className="text-sm text-gray-500">
          Peso: {singleResidue.weight} kg
        </Text>
        {singleResidueVariantEstimatedValue && (
          <Text className="text-sm text-gray-500">
            Preço total: R$ {singleResidue.estimatedValue?.toFixed(2) ?? "0.00"}
          </Text>
        )}
        {singleResidueVariantPricePerKg && (
          <Text className="text-sm text-gray-500">
            Preço por kg: R${" "}
            {singleResidue.pricePerKg != null
              ? singleResidue.pricePerKg.toFixed(2)
              : "0.00"}
          </Text>
        )}
        <Text className="text-sm text-gray-500">
          Embalagem: {singleResidue.pkg}
        </Text>
        <Text className="text-sm text-gray-500">
          Condição: {singleResidue.condition}
        </Text>
        {singleResidue.photo && (
          <Image
            source={{ uri: singleResidue.photo }}
            style={{
              width: "100%",
              height: 150,
              marginTop: 8,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        )}
      </View>

      <View>
        <Text className="font-semibold text-gray-700 mb-1">Endereço</Text>
        <Text className="text-sm text-gray-500">
          Rua: {item.address.street}, Nº {item.address.number}
        </Text>
        <Text className="text-sm text-gray-500">
          Bairro: {item.address.neighborhood}
        </Text>
        {item.address.complement && (
          <Text className="text-sm text-gray-500">
            Complemento: {item.address.complement}
          </Text>
        )}
        <Text className="text-sm text-gray-500">
          Cidade: {item.address.city} - {item.address.state}
        </Text>
        <Text className="text-sm text-gray-500">
          CEP: {item.address.postalCode}
        </Text>
        {item.address.latitude && item.address.longitude && (
          <Text className="text-sm text-gray-500">
            Localização: {item.address.latitude}, {item.address.longitude}
          </Text>
        )}
      </View>
    </Card>
  );
};

export default HistoryCollectsCard;
