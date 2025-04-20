import React, { useState, ReactNode } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

interface InterfaceSwitchProps {
  rightLabel: string;
  leftLabel: string;
  rightComponent: ReactNode;
  leftComponent: ReactNode;
  defaultValue?: boolean;
  onToggleChange?: (value: boolean) => void;
}

const InterfaceSwitch: React.FC<InterfaceSwitchProps> = ({
  rightLabel,
  leftLabel,
  rightComponent,
  leftComponent,
  defaultValue = false, // Default state
  onToggleChange,
}) => {
  const [isToggled, setIsToggled] = useState(defaultValue);

  const handleToggle = (value: boolean) => {
    setIsToggled(value);
    onToggleChange?.(value);
  };

  return (
    <>
      {/* Custom Toggle Buttons */}
      <View style={styles.switchContainer}>
        {/* Left Button (Inactive/Active) */}
        <Pressable
          style={[styles.button, !isToggled && styles.activeButton]}
          onPress={() => handleToggle(false)}
        >
          <Text style={[styles.buttonText, !isToggled && styles.activeText]}>
            {leftLabel}
          </Text>
        </Pressable>

        {/* Right Button (Active/Inactive) */}
        <Pressable
          style={[styles.button, isToggled && styles.activeButton]}
          onPress={() => handleToggle(true)}
        >
          <Text style={[styles.buttonText, isToggled && styles.activeText]}>
            {rightLabel}
          </Text>
        </Pressable>
      </View>

      {/* Show Different Components Based on State */}
      {isToggled ? rightComponent : leftComponent}
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
    backgroundColor: "#ffffff", // Active color
    shadowOffset: { width: 0, height: 1.5 },
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
