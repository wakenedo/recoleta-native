import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  calendarViewContainer: {
    flex: 1,
  },
  yearText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    textAlign: "left",
  },
  headerContainerRowStyle: {
    borderBottomWidth: 0,
    display: "flex",

    zIndex: 1,
    width: 53,
    paddingHorizontal: 5,
    backgroundColor: "#2196f3",
    elevation: 2,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer7DaysRowStyle: {
    borderBottomWidth: 0,
    display: "flex",
    zIndex: 1,
    width: 35,
    paddingHorizontal: 4,
    backgroundColor: "#2196f3",
    elevation: 2,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer3DaysRowStyle: {
    borderBottomWidth: 0,
    display: "flex",

    zIndex: 1,
    width: 52,
    paddingHorizontal: 5,
    backgroundColor: "#2196f3",
    elevation: 2,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextStyle: {
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
    margin: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  gridColumnStyle: {
    borderRightColor: "#fff",
    borderRightWidth: 1,
  },
  gridRowStyle: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  dayHeaderContainer: {
    display: "flex",
    flexDirection: "column",
  },
  dayHeaderTopLabel: {
    fontSize: 10,
    color: "#fcfcfc",
    fontWeight: "bold",
    textAlign: "center",
  },
  dayHeaderBottomLabel: {
    fontSize: 13,
    color: "#fcfcfc",
    fontWeight: "300",
    textAlign: "center",
  },
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

export default styles;
