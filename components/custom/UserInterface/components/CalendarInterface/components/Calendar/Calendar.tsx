import React, { useState } from "react";
import { View } from "react-native";
import { renderCalendarView } from "../../utils";

const Calendar = () => {
  // State to manage the selected view type: 'week' or 'day'
  const [viewType, setViewType] = useState<"week" | "day">("week");

  const handleViewChange = (newView: "week" | "day") => setViewType(newView);

  return (
    <View className="flex-1">
      {renderCalendarView(viewType, handleViewChange)}
    </View>
  );
};

export default Calendar;
