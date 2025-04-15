import React, { FC, useState } from "react";
import { View, Platform, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Heading } from "@/components/ui/heading";
import { Calendar } from "lucide-react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useResidue } from "@/hooks/useResidue"; // adjust path as needed
import { AvailableDateProps } from "../types";

const AvailableDate: FC<AvailableDateProps> = () => {
  const [show, setShow] = useState(false);
  const { selectedDate, setDate } = useResidue();

  const onChange = (_: any, selected: Date | undefined) => {
    setShow(false);
    if (selected) {
      setDate(selected);
    }
  };

  return (
    <View className={`${Platform.OS !== "windows" ? "mt-6" : ""}`}>
      <Heading size="xs" className="mb-2">
        Data Preferida para Coleta
      </Heading>

      <TouchableOpacity
        className="flex-row items-center bg-white"
        onPress={() => setShow(true)}
        activeOpacity={0.8}
      >
        <View className="p-[6px] border rounded-md border-gray-300 mr-2 shadow-sm bg-white">
          <Calendar size={20} color="#4B5563" />
        </View>
        <Text className="text-base text-gray-700">
          {selectedDate
            ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR })
            : "Selecionar Data"}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

export default AvailableDate;
