import React, { FC } from "react";
import { Text, View } from "react-native";
import { UserRegisteredCollectsCardProps } from "../../../../types";
import { Card } from "@/components/ui/card";

const UserRegisteredCollectsCard: FC<UserRegisteredCollectsCardProps> = ({
  item,
}) => {
  if (item.residues[0]?._id === undefined) return null;

  if (item.residues === undefined) return null;

  if (item.address === undefined) return null;

  return (
    <Card className="mb-3 p-4 rounded-xl shadow bg-white">
      <View className="flex-col items-center mb-2">
        <Text className="text-lg font-bold">{item.eventName}</Text>
        <Text className="text-sm text-gray-500 ml-2">
          Assinado : {item.isSigned ? "Sim" : "Não"}
        </Text>
        {item.isSigned === true && (
          <View>
            <Text>Assinado por: </Text>
            <Text className="text-sm text-gray-500">
              {item.signedBy.firstName} - {item.signedBy.email}
            </Text>
          </View>
        )}
        <Text className="text-sm text-gray-500">
          Craido em : {item.createdAt}
        </Text>
        <Text className="text-sm text-gray-500">Hora : {item.createdAt}</Text>
      </View>
      <View className="flex-col justify-between mb-2">
        <Text className="text-sm text-gray-500">
          Nome: {item.residues[0]?.name}
        </Text>
        <Text className="text-sm text-gray-500">
          Peso: {item.residues[0]?.weight} kg
        </Text>
        <Text className="text-sm text-gray-500">
          Embalagem: {item.residues[0]?.pkg}
        </Text>
        <Text className="text-sm text-gray-500">
          Condição: {item.residues[0]?.condition}
        </Text>
        {item.residues[0]?.photo && (
          <Text className="text-sm text-gray-500">
            Foto: {item.residues[0]?.photo}
          </Text>
        )}
      </View>
      <View className="flex-col justify-between mb-2">
        <Text className="text-sm text-gray-500">
          Endereço: {item.address.street}, {item.address.number}
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
          Cidade: {item.address.city}
        </Text>
        <Text className="text-sm text-gray-500">
          Estado: {item.address.state}
        </Text>
        <Text className="text-sm text-gray-500">
          CEP: {item.address.postalCode}
        </Text>
        {item.address.latitude && item.address.longitude && (
          <Text className="text-sm text-gray-500">
            Latitude: {item.address.latitude}, Longitude:{" "}
            {item.address.longitude}
          </Text>
        )}
      </View>
    </Card>
  );
};
export default UserRegisteredCollectsCard;
