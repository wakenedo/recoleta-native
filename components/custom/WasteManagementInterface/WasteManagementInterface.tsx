import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { SelectableResidueIcons } from "./SelectableResidueIcons";
import { QuantityInput } from "./QuantityInput";
import { ResidueConditionSelector } from "./ResidueConditionSelector";
import { PackageAvailableSelector } from "./PackageAvailableSelector";
import { AvailableDate } from "./AvailableDate";
import { ScheduleHour } from "./ScheduleHour";
import { TakeResiduePhoto } from "./TakeResiduePhoto";
import { FormControl } from "@/components/ui/form-control";
import { useResidue } from "@/hooks/useResidue";
import { ResidueVariant } from "./types";
import { ResidueVariantSelector } from "./ResidueVariantSelector";
import { useAuth } from "@/context/AuthContext";

interface WasteManagementInterfaceProps {}

export const WasteManagementInterface: React.FC<
  WasteManagementInterfaceProps
> = ({}) => {
  const {
    selectedResidue,
    weight,
    selectedCondition,
    selectedPackage,
    selectedDate,
    selectedHour,
    photo,
    setResidue,
    setWeight,
    setCondition,
    setPackage,
    setDate,
    setHour,
    setPhoto,
  } = useResidue();
  const { authState } = useAuth();

  const [selectedVariant, setSelectedVariant] = useState<ResidueVariant | null>(
    null
  );
  const [priceTable, setPriceTable] = useState<
    Record<string, ResidueVariant[]>
  >({});

  useEffect(() => {
    const fetchPriceTable = async () => {
      try {
        const res = await fetch(
          "http://192.168.96.2:5000/api/price-tables/sp",
          {
            headers: { Authorization: `Bearer ${authState?.token}` },
          }
        );
        const json = await res.json();
        setPriceTable(json);
      } catch (err) {
        console.warn(
          "[WasteManagementInterface] Erro ao buscar tabela de preços:",
          err
        );
      }
    };

    fetchPriceTable();
  }, []);

  const variants: ResidueVariant[] =
    selectedResidue && selectedResidue.apiName
      ? priceTable[selectedResidue.apiName] || []
      : [];

  return (
    <Card className="border border-zinc-300">
      <View className="mb-6">
        <Heading size="xs">Detalhes do Resíduo para Descarte</Heading>
        <Text size="xs" className="mt-2">
          Selecione o tipo de resíduo e forneça as informações adicionais
        </Text>
      </View>

      <FormControl className="space-y-6">
        <SelectableResidueIcons
          selectedResidue={selectedResidue}
          setSelectedResidue={setResidue}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
        {variants.length > 0 && (
          <ResidueVariantSelector
            variants={variants}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        )}
        <QuantityInput weight={weight} setWeight={setWeight} />
        <ResidueConditionSelector
          selectedCondition={selectedCondition}
          setSelectedCondition={setCondition}
        />
        <PackageAvailableSelector
          selectedPackage={selectedPackage}
          setSelectedPackage={setPackage}
        />
        <AvailableDate selectedDate={selectedDate} setSelectedDate={setDate} />
        <ScheduleHour
          selectedHour={selectedHour}
          selectedDate={selectedDate}
          setSelectedHour={setHour}
        />
        <TakeResiduePhoto photo={photo || null} setPhoto={setPhoto} />
      </FormControl>
    </Card>
  );
};
export default WasteManagementInterface;
