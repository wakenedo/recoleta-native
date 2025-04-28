import React from "react";
import { Calendar } from "./components/Calendar";
import { Text, View } from "react-native";
import { CalendarCheck } from "lucide-react-native";

const CalendarInterface = () => {
  return (
    <View className="flex-1 ">
      <View className="">
        <View className="flex-row items-center justify-start px-1">
          <View className="mr-2">
            <CalendarCheck size={32} color="#000" />
          </View>
          <View className="mt-2">
            <Text className="text-left text-2xl font-bold  ">Calendário</Text>
          </View>
        </View>
        <View className="px-2 my-2">
          <Text className="text-left text-sm font-bold">
            Visualize suas coletas agendadas e os dias disponíveis para
            agendamento.
          </Text>
        </View>
      </View>

      <Calendar />
    </View>
  );
};

export default CalendarInterface;
