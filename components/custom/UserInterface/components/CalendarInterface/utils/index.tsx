import { format } from "date-fns";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WeekView from "react-native-week-view";

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
  const styles = StyleSheet.create({
    viewToggleContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    activeButton: {
      backgroundColor: "#2196f3",
    },
    toggleButtonText: {
      color: "#fff",
      fontSize: 12,
    },
    toggleButton: {
      minWidth: 60,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#4caf50",
      borderRadius: 1,
      marginLeft: 3,
      marginTop: 3,
    },
  });

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
  const styles = StyleSheet.create({
    dayHeaderContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      zIndex: 10,
    },
    dayHeaderTopLabel: {
      fontSize: 10,
      color: "#fcfcfc",
      fontWeight: "bold",
      textAlign: "center",
    },
    dayHeaderBottomLabel: {
      fontSize: 16,
      color: "#fcfcfc",
      fontWeight: "300",
      textAlign: "center",
    },
  });
  const dayOfWeek = format(props.date, "EEE"); // Get the full day name, e.g., "Monday"
  const dayNumber = format(props.date, "d"); // Get the day number, e.g., "25"
  return (
    <View style={styles.dayHeaderContainer}>
      <View className=" bg-[#4ea3e8] justify-center  w-full h-full">
        <Text style={styles.dayHeaderTopLabel}>{dayOfWeek}</Text>
        <Text style={styles.dayHeaderBottomLabel}>{dayNumber}</Text>
      </View>
    </View>
  );
};

const renderCalendarView = (
  viewType: string,
  handleViewChange: (newView: "week" | "day") => void
) => {
  const formattedYear = format(new Date(), "yyyy"); // Display only the month name (e.g., "April")
  const styles = StyleSheet.create({
    calendarViewContainer: {
      flex: 1,
      paddingHorizontal: 4,
    },
    yearText: {
      fontSize: 28,
      fontWeight: "700",
      color: "#333",
      textAlign: "left",
    },
    headerContainerRowStyle: {
      borderBottomWidth: 0,
      zIndex: 1,
      backgroundColor: "#2196f3",
      elevation: 2,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      width: 35,
      justifyContent: "center",
      alignItems: "center",
    },
    dayHeaderContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      zIndex: 10,
    },
    headerTextStyle: {
      width: 40,
      fontSize: 10,
      color: "#fff",
      fontWeight: "bold",
    },
    hourTextStyle: {
      color: "#333",
      fontSize: 12,
    },
    eventContainerStyle: {
      borderRadius: 8,
      margin: 3,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    gridColumnStyle: {
      borderRightColor: "#fff",
      borderRightWidth: 1.5,
    },
    gridRowStyle: {
      borderBottomColor: "#fff",
      borderBottomWidth: 1.5,
    },
  });

  const events: EventProps[] = [
    {
      id: 1,
      description: "Pickup Waste",
      startDate: new Date("2025-04-24T10:00:00"),
      endDate: new Date("2025-04-24T11:30:00"),
      color: "#4caf50", // green
      eventKind: "standard",
      resolveOverlap: "stack",
      stackKey: "pickup-waste",
    },
    {
      id: 2,
      description: "Delivery Materials",
      startDate: new Date("2025-04-25T14:00:00"),
      endDate: new Date("2025-04-25T15:30:00"),
      color: "#2196f3", // blue
      eventKind: "standard",
      resolveOverlap: "stack",
      stackKey: "delivery-materials",
    },
  ];
  return (
    <View style={styles.calendarViewContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.yearText}>{formattedYear}</Text>
        {renderViewButtons({ handleViewChange })}
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <WeekView
          events={events}
          selectedDate={new Date()}
          numberOfDays={viewType === "week" ? 7 : 1} // 7 days for week view, 1 day for day view
          headerStyle={styles.headerContainerRowStyle}
          DayHeaderComponent={renderDayHeader}
          locale="pt-BR"
          headerTextStyle={styles.headerTextStyle}
          timesColumnWidth={30}
          hoursInDisplay={12}
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
