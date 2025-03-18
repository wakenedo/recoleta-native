import React from "react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

const WasteManagementMockedCards = [
  {
    id: "1",
    title: "Papel",
    image: "https://via.placeholder.com/150",
    alt: "Papel",
  },
  {
    id: "2",
    title: "Plástico",
    image: "https://via.placeholder.com/150",
    alt: "Plástico",
  },
  {
    id: "3",
    title: "Vidro",
    image: "https://via.placeholder.com/150",
    alt: "Vidro",
  },
  {
    id: "4",
    title: "Eletrônico",
    image: "https://via.placeholder.com/150",
    alt: "Vidro",
  },
  {
    id: "5",
    title: "Orgânico",
    image: "https://via.placeholder.com/150",
    alt: "Orgânico",
  },
  {
    id: "6",
    title: "Metal",
    image: "https://via.placeholder.com/150",
    alt: "Metal",
  },
];

const SelectableResidueIcons = () => {
  return (
    <View>
      <Heading size="xs">Tipo de Resído</Heading>
      <View className="flex-row flex-wrap justify-between mt-2">
        {WasteManagementMockedCards.map((card) => (
          <Card
            key={card.id}
            className=" items-center my-2 border border-zinc-300 w-[150px] h-fit p-2 rounded-lg"
          >
            <Image
              source={{ uri: card.image }}
              style={{
                height: 250,
                width: 250,
              }}
              className="  w-[100px] h-[125px]"
            />
            <Text>{card.title}</Text>
          </Card>
        ))}
      </View>
    </View>
  );
};
export default SelectableResidueIcons;
