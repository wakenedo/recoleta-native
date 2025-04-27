import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { UserTypePickerProps } from "@/components/custom/AuthInterface/types/AuthInterfaceTypes";

const RegisterUserTypePicker = ({
  field,
  setShowUserTypePicker,
  showUserTypePicker,
  isLoading,
}: UserTypePickerProps) => {
  const options = [
    { label: "Gerador de Resíduos", value: "PRODUCES_WASTE" },
    { label: "Coletor de Resíduos", value: "COLLECTS_WASTE" },
  ];

  const handleSelect = (value: string) => {
    field.onChange(value);
    setShowUserTypePicker(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.pickerTrigger}
        onPress={() => setShowUserTypePicker(!showUserTypePicker)}
        disabled={isLoading}
        accessibilityLabel="Selecione o tipo de usuário"
      >
        <Text
          style={field.value ? styles.pickerValue : styles.pickerPlaceholder}
        >
          {field.value === "PRODUCES_WASTE"
            ? "Gerador de Resíduos"
            : field.value === "COLLECTS_WASTE"
            ? "Coletor de Resíduos"
            : "Selecione o tipo"}
        </Text>
        <ChevronDown size={20} color="#6B7280" />
      </TouchableOpacity>

      {showUserTypePicker && (
        <View style={styles.dropdown}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.dropdownItem}
              onPress={() => handleSelect(option.value)}
            >
              <Text style={styles.dropdownItemText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerTrigger: {
    elevation: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 16,
  },
  pickerPlaceholder: {
    color: "#9CA3AF",
  },
  pickerValue: {
    color: "#000000",
  },
  dropdown: {
    position: "relative",
    marginTop: -6,
    backgroundColor: "#F3F4F6",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
    // Elevation for Android
    elevation: 0.5,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#000",
  },
});

export default RegisterUserTypePicker;
