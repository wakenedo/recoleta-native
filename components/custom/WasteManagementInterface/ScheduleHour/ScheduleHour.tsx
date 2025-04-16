import React, { FC, useState } from "react";
import { View, Platform, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Heading } from "@/components/ui/heading";
import { Clock } from "lucide-react-native";
import { ScheduleHourProps } from "../types";
import { format, isValid } from "date-fns"; // Importing isValid

const ScheduleHour: FC<ScheduleHourProps> = ({
  selectedHour,
  setSelectedHour,
  selectedDate,
}) => {
  const [show, setShow] = useState(false);
  const [invalidTime, setInvalidTime] = useState(false);

  const onChange = (_: any, selected: Date | undefined) => {
    setShow(false);

    // Basic validation for empty or invalid selected date/time
    if (!selectedDate || !selected) {
      setSelectedHour("");
      setInvalidTime(true);
      console.warn("No selected date or time. Aborting.");
      return;
    }

    if (!isValid(selectedDate)) {
      setSelectedHour("");
      setInvalidTime(true);
      console.warn("❌ selectedDate is invalid.");
      return;
    }

    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    const isToday = selectedDate.toDateString() === now.toDateString();

    const hours = selected.getHours();
    const minutes = selected.getMinutes();

    if (isNaN(hours) || isNaN(minutes)) {
      setSelectedHour("");
      setInvalidTime(true);
      console.warn("❌ Selected time has invalid hours or minutes.");
      return;
    }

    const fullSelectedTime = new Date(selectedDate);
    fullSelectedTime.setHours(hours);
    fullSelectedTime.setMinutes(minutes);
    fullSelectedTime.setSeconds(0);
    fullSelectedTime.setMilliseconds(0);

    if (!isValid(fullSelectedTime)) {
      setSelectedHour("");
      setInvalidTime(true);
      console.warn("❌ Invalid fullSelectedTime.");
      return;
    }

    // Check if the time is in the past (if today)
    if (isToday) {
      const selectedTime = hours * 60 + minutes;
      const currentTime = now.getHours() * 60 + now.getMinutes();

      if (selectedTime <= currentTime) {
        setSelectedHour("");
        setInvalidTime(true);
        console.warn("❌ Selected time is in the past.");
        return;
      }
    }

    // Check if the time exceeds valid hours (24:00+)
    if (hours >= 24) {
      setSelectedHour("");
      setInvalidTime(true);
      console.warn("❌ Selected time exceeds 23:59.");
      return;
    }

    try {
      const formattedTime = format(fullSelectedTime, "HH:mm");
      setSelectedHour(formattedTime);
      setInvalidTime(false); // Reset invalid time flag
      console.log("✅ Valid time selected:", formattedTime);
    } catch (error) {
      console.error("⛔ Failed to format time:", error);
      setSelectedHour("");
      setInvalidTime(true);
    }
  };

  const displayText = invalidTime
    ? "Algo deu errado ao agendar o horário"
    : !selectedDate
    ? "Escolha uma data antes de escolher o horário"
    : selectedHour || "Selecionar Hora";

  return (
    <View className={`${Platform.OS !== "windows" ? "mt-6" : ""}`}>
      <Heading size="xs" className="mb-2">
        Hora Preferida para Coleta
      </Heading>

      <TouchableOpacity
        className="flex-row items-center bg-white"
        onPress={() => setShow(true)}
        activeOpacity={0.8}
        disabled={!selectedDate}
      >
        <View className="p-[6px] border rounded-md border-gray-300 mr-2 shadow-sm bg-white">
          <Clock size={20} color="#4B5563" />
        </View>
        <Text
          className={`text-base ${
            invalidTime ? "text-red-600" : "text-gray-700"
          }`}
        >
          {displayText}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="spinner" // Use 'spinner' for better AM/PM handling
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default ScheduleHour;
