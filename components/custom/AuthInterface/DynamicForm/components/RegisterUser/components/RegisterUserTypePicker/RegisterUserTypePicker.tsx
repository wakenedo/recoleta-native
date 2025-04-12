import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";
import { UserTypePickerProps } from "@/components/custom/AuthInterface/types/AuthInterfaceTypes";

const RegisterUserTypePicker = ({
  field,
  setShowUserTypePicker,
  showUserTypePicker,
  isLoading,
}: UserTypePickerProps) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.pickerTrigger}
        onPress={() => setShowUserTypePicker(true)}
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
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={field.value}
            onValueChange={(itemValue) => {
              field.onChange(itemValue);
              setShowUserTypePicker(false);
            }}
            itemStyle={{
              color: "black",
              height: 120,
              fontSize: 16,
            }}
          >
            <Picker.Item label="Selecione o tipo" value="" />
            <Picker.Item label="Gerador de Resíduos" value="PRODUCES_WASTE" />
            <Picker.Item label="Coletor de Resíduos" value="COLLECTS_WASTE" />
          </Picker>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerTrigger: {
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
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});

export default RegisterUserTypePicker;
