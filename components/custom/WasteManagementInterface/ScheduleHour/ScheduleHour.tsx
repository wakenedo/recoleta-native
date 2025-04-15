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

    if (!selectedDate || !selected) {
      setSelectedHour("");
      setInvalidTime(true);
      console.warn("No selected date or time. Aborting.");
      return;
    }

    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    const isToday = selectedDate.toDateString() === now.toDateString();

    // Set the hours and minutes based on the selected time
    const fullSelectedTime = new Date(selectedDate);
    fullSelectedTime.setHours(selected.getHours());
    fullSelectedTime.setMinutes(selected.getMinutes());
    fullSelectedTime.setSeconds(0);
    fullSelectedTime.setMilliseconds(0);

    // Use isValid to check if the date is valid
    if (!isValid(fullSelectedTime)) {
      setSelectedHour("");
      setInvalidTime(true);
      console.warn("❌ Invalid selected time.");
      return;
    }

    console.log("🕓 Current time:", now.toISOString());
    console.log("📆 Selected date:", selectedDate.toISOString());
    console.log("🕒 Selected time:", fullSelectedTime.toISOString());

    // Rule 1: For today, time must be strictly in the future
    if (isToday) {
      // Only compare the time portion (not date)
      const selectedTime =
        fullSelectedTime.getHours() * 60 + fullSelectedTime.getMinutes();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      if (selectedTime <= currentTime) {
        setSelectedHour("");
        setInvalidTime(true);
        console.warn("❌ Selected time is in the past.");
        return;
      }
    }

    // Rule 2: Block times >= 24:00 (which shouldn't happen, but just in case)
    if (fullSelectedTime.getHours() >= 24) {
      setSelectedHour("");
      setInvalidTime(true);
      console.warn("❌ Selected time exceeds 23:59.");
      return;
    }

    // If valid, format and set the selected hour
    try {
      const formattedTime = format(fullSelectedTime, "HH:mm");
      setSelectedHour(formattedTime);
      setInvalidTime(false);
      console.log("✅ Valid time selected:", formattedTime);
    } catch (error) {
      console.error("⛔ Failed to format time:", error);
      setSelectedHour("");
      setInvalidTime(true);
    }
  };

  const displayText = invalidTime
    ? "Não foi possível agendar esse horário"
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
