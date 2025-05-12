import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Text as RNText,
  Button,
} from "react-native";
import { Text } from "@/components/ui/text"; // assuming you have a custom Text component
import { GoogleUserWelcome } from "./components/GoogleUserWelcome";
import { AddPersonalInfo } from "./components/AddPersonalInfo";

type Props = {
  onSelect: (userType: "COLLECTS_WASTE" | "PRODUCES_WASTE") => void;
};

const UserTypePicker = ({ onSelect }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<
    "COLLECTS_WASTE" | "PRODUCES_WASTE" | null
  >(null);

  const handleSelect = (userType: "COLLECTS_WASTE" | "PRODUCES_WASTE") => {
    setSelectedUserType(userType);
    setIsModalVisible(true); // Show modal when a user type is selected
  };

  const handleConfirm = () => {
    if (selectedUserType) {
      onSelect(selectedUserType); // Call the parent function with the selected type
      setIsModalVisible(false); // Close the modal
    }
  };

  const handleCancel = () => {
    setSelectedUserType(null); // Reset selection
    setIsModalVisible(false); // Close the modal
  };

  return (
    <>
      <GoogleUserWelcome />
      <AddPersonalInfo />
      <View className="p-6 bg-white rounded shadow-lg w-full">
        <Text className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Escolha seu tipo de usuário
        </Text>

        <TouchableOpacity
          onPress={() => handleSelect("COLLECTS_WASTE")}
          className="items-center bg-green-100 p-4 rounded-2xl mb-4 shadow-md"
        >
          <Text className="text-green-800 text-center font-semibold text-lg">
            Coletor de Resíduos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelect("PRODUCES_WASTE")}
          className="items-center bg-blue-100 p-4 rounded-2xl shadow-md"
        >
          <Text className="text-blue-800 text-center font-semibold text-lg">
            Produtor de Resíduos
          </Text>
        </TouchableOpacity>

        {/* Confirmation Modal */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="fade"
          onRequestClose={handleCancel}
        >
          <View className="flex-1 justify-center items-center bg-opacity-50">
            <View className="bg-white p-6 rounded-xl shadow-lg w-80">
              <RNText className="text-lg font-semibold text-center text-gray-800 mb-4">
                Atenção!
              </RNText>
              <RNText className="text-center text-gray-700 mb-6">
                Esta é uma decisão permanente. Você tem certeza de que deseja
                continuar?
              </RNText>
              <View className="flex-row justify-around">
                <Button title="Cancelar" onPress={handleCancel} />
                <Button title="Confirmar" onPress={handleConfirm} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default UserTypePicker;
