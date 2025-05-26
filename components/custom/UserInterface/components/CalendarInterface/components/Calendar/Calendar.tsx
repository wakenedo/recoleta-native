import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { renderCalendarView } from "../../utils";
import { useWasteProducer } from "@/context/WasteProducerContext";

const Calendar = () => {
  const { collects, fetchCollects } = useWasteProducer();
  // State to manage the selected view type: 'week' or 'day'
  const [viewType, setViewType] = useState<"week" | "day" | "3-days">("week");

  const handleViewChange = (newView: "week" | "day" | "3-days") =>
    setViewType(newView);

  useEffect(() => {
    if (collects.length === 0) {
      fetchCollects();
    } else return;
  }, []);

  return (
    <View className="flex-1">
      {renderCalendarView(viewType, handleViewChange, collects)}
    </View>
  );
};

export default Calendar;
