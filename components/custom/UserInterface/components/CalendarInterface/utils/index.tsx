import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { format } from "date-fns";
import WeekView from "react-native-week-view";
import styles from "../constants/styles";

interface EventProps {
  id: number;
  description: string;
  startDate: Date;
  endDate: Date;
  color: string;
  eventKind: "block" | "standard";
  resolveOverlap: "stack" | "lane" | "ignore";
  stackKey: string;
}

const renderViewButtons = ({
  handleViewChange,
}: {
  handleViewChange: (newView: "week" | "day") => void;
}) => {
  return (
    <View style={styles.viewToggleContainer}>
      <TouchableOpacity
        style={[styles.toggleButton, styles.activeButton]}
        onPress={() => handleViewChange("week")}
      >
        <Text style={styles.toggleButtonText}>Semana</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleButton, styles.activeButton]}
        onPress={() => handleViewChange("day")}
      >
        <Text style={styles.toggleButtonText}>Dia</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderDayHeader = (props: any) => {
  const dayOfWeek = format(props.date, "EEE"); // Get the full day name, e.g., "Monday"
  const dayNumber = format(props.date, "d"); // Get the day number, e.g., "25"
  return (
    <View style={styles.dayHeaderContainer}>
      <Text style={styles.dayHeaderTopLabel}>{dayOfWeek}</Text>
      <Text style={styles.dayHeaderBottomLabel}>{dayNumber}</Text>
    </View>
  );
};

const renderCalendarView = (
  viewType: string,
  handleViewChange: (newView: "week" | "day") => void,
  collects: any[]
) => {
  const formattedYear = format(new Date(), "yyyy"); // Display only the month name (e.g., "April")

  const isValidDate = (date: any) => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  const events: EventProps[] = collects
    .filter((collect: any) => {
      if (!collect || !collect.dateTime) return false;

      const date = new Date(collect.dateTime);
      return isValidDate(date);
    })
    .map((collect: any) => {
      const startDate = new Date(collect.dateTime);
      const EVENT_DURATION_MINUTES = 60;
      const endDate = new Date(
        startDate.getTime() + EVENT_DURATION_MINUTES * 60 * 1000
      );

      return {
        id: collect._id,
        description: collect.eventName || "Sem nome",
        startDate,
        endDate,
        color: collect.isSigned ? "#4caf50" : "#f44336",
        eventKind: "standard",
        resolveOverlap: "stack",
        stackKey: collect.eventName || "coleta",
      };
    });

  return (
    <View style={styles.calendarViewContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.yearText}>{formattedYear}</Text>

        {renderViewButtons({ handleViewChange })}
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <WeekView
          nowLineColor="#4ea3e8"
          events={events}
          selectedDate={new Date()}
          numberOfDays={viewType === "week" ? 7 : 1} // 7 days for week view, 1 day for day view
          headerStyle={styles.headerContainerRowStyle}
          DayHeaderComponent={renderDayHeader}
          locale="pt-BR"
          headerTextStyle={styles.headerTextStyle}
          timesColumnWidth={viewType === "week" ? 48 : 52}
          hoursInDisplay={viewType === "week" ? 8 : 6}
          hourTextStyle={styles.hourTextStyle}
          eventContainerStyle={styles.eventContainerStyle}
          gridColumnStyle={styles.gridColumnStyle}
          gridRowStyle={styles.gridRowStyle}
          onEventPress={(event) => console.log("Pressed event:", event)}
          onGridClick={(event) => console.log("Pressed empty:", event)}
        />
      </View>
    </View>
  );
};

export { renderViewButtons, renderCalendarView };
