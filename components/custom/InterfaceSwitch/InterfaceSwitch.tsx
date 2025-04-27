import React, { ReactNode } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

interface InterfaceSwitchProps {
  rightLabel: string;
  leftLabel: string;
  rightComponent: ReactNode;
  leftComponent: ReactNode;
  value: boolean; // Controlled value
  onToggleChange?: (value: boolean) => void;
}

const InterfaceSwitch: React.FC<InterfaceSwitchProps> = ({
  rightLabel,
  leftLabel,
  rightComponent,
  leftComponent,
  value,
  onToggleChange,
}) => {
  const handleToggle = (newValue: boolean) => {
    if (onToggleChange) {
      onToggleChange(newValue);
    }
  };

  return (
    <>
      {/* Custom Toggle Buttons */}
      <View style={styles.switchContainer}>
        <Pressable
          style={[styles.button, !value && styles.activeButton]}
          onPress={() => handleToggle(false)}
        >
          <Text style={[styles.buttonText, !value && styles.activeText]}>
            {leftLabel}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.button, value && styles.activeButton]}
          onPress={() => handleToggle(true)}
        >
          <Text style={[styles.buttonText, value && styles.activeText]}>
            {rightLabel}
          </Text>
        </Pressable>
      </View>

      {value ? rightComponent : leftComponent}
    </>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginVertical: 6,
    width: "auto",
    height: 35,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 3,
    borderRadius: 6,
  },
  activeButton: {
    borderRadius: 4,
    height: 27,
    backgroundColor: "#ffffff", // Active color
    elevation: 0.5,
    paddingHorizontal: 1.5,

    shadowColor: "#000",
    shadowOpacity: 0.1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8c8c8c",
  },
  activeText: {
    color: "#1d1d1d",
  },
});

export default InterfaceSwitch;
