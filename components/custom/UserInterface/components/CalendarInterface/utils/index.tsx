import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import moment from "moment";
import "moment/locale/pt-br";
import WeekView from "react-native-week-view";
import styles from "../constants/styles";

moment.locale("pt-br");
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
  handleViewChange: (newView: "week" | "day" | "3-days") => void;
}) => {
  return (
    <View style={styles.viewToggleContainer}>
      <TouchableOpacity
        style={[styles.toggleButton, styles.activeButton]}
        onPress={() => handleViewChange("week")}
      >
        <Text style={styles.toggleButtonText}>7 Dias</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleButton, styles.activeButton]}
        onPress={() => handleViewChange("3-days")}
      >
        <Text style={styles.toggleButtonText}>3 Dias</Text>
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

const daysShortenForPortuguese = (day: string) => {
  switch (day) {
    case "segunda":
      return "Seg";
    case "terça":
      return "Ter";
    case "quarta":
      return "Qua";
    case "quinta":
      return "Qui";
    case "sexta":
      return "Sex";
    case "sábado":
      return "Sáb";
    case "domingo":
      return "Dom";
    default:
      return "";
  }
};

const renderDayHeader = (props: any) => {
  const dayOfWeek = format(props.date, "E", { locale: ptBR }); // Get the full day name, e.g., "Monday"
  const dayNumber = format(props.date, "d", { locale: ptBR }); // Get the day number, e.g., "25"
  const dayOfWeekShort = daysShortenForPortuguese(dayOfWeek); // Translate to Portuguese short form
  return (
    <View style={styles.dayHeaderContainer}>
      <Text style={styles.dayHeaderTopLabel}>{dayOfWeekShort}</Text>
      <Text style={styles.dayHeaderBottomLabel}>{dayNumber}</Text>
    </View>
  );
};

const renderCalendarView = (
  viewType: string,
  handleViewChange: (newView: "week" | "day" | "3-days") => void,
  collects: any[]
) => {
  const [mounted, setMounted] = useState(false); // 🛠️ Add mount state

  useEffect(() => {
    setMounted(true); // ✅ Set mounted after first render
  }, []);

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

  const definedViewType = (viewType: string) => {
    switch (viewType) {
      case "week":
        return 7; // 7 days for week view
      case "3-days":
        return 3; // 3 days for 3-days view
      case "day":
        return 1; // 1 day for day view
      default:
        return 3; // Default to week view if no valid type is provided
    }
  };

  const definedTimesColumnWidth = (viewType: string) => {
    switch (viewType) {
      case "week":
        return 32; // 47 for week view
      case "3-days":
        return 50; // 52 for 3-days view
      case "day":
        return 52; // 52 for day view
      default:
        return 52; // Default to week view if no valid type is provided
    }
  };

  const definedHoursInDisplay = (viewType: string) => {
    switch (viewType) {
      case "week":
        return 8; // 8 hours for week view
      case "3-days":
        return 6; // 6 hours for 3-days view
      case "day":
        return 6; // 6 hours for day view
      default:
        return 8; // Default to week view if no valid type is provided
    }
  };

  const definedHeaderStyle = (viewType: string) => {
    switch (viewType) {
      case "week":
        return styles.headerContainer7DaysRowStyle; // Use row style for week view
      case "3-days":
        return styles.headerContainer3DaysRowStyle; // Use row style for 3-days view
      case "day":
        return styles.headerContainerRowStyle; // Use column style for day view
      default:
        return styles.headerContainerRowStyle; // Default to week view if no valid type is provided
    }
  };

  return (
    <View style={styles.calendarViewContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 3,
        }}
      >
        <Text style={styles.yearText}>{formattedYear}</Text>

        {renderViewButtons({ handleViewChange })}
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {mounted ? (
          <WeekView
            nowLineColor="#4ea3e8"
            events={events}
            selectedDate={new Date()}
            numberOfDays={definedViewType(viewType)} // 7 days for week view, 1 day for day view
            headerStyle={definedHeaderStyle(viewType)}
            DayHeaderComponent={renderDayHeader}
            locale="pt-br"
            headerTextStyle={styles.headerTextStyle}
            timesColumnWidth={definedTimesColumnWidth(viewType)}
            hoursInDisplay={definedHoursInDisplay(viewType)}
            hourTextStyle={styles.hourTextStyle}
            eventContainerStyle={styles.eventContainerStyle}
            gridColumnStyle={styles.gridColumnStyle}
            gridRowStyle={styles.gridRowStyle}
            onEventPress={(event) => console.log("Pressed event:", event)}
            onGridClick={(event) => console.log("Pressed empty:", event)}
          />
        ) : null}
      </View>
    </View>
  );
};

export { renderViewButtons, renderCalendarView };
