import { StyleSheet } from "react-native";

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
