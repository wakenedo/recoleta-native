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
import { useUser } from "@/context/UserContext";
import { UserTypePickerInterface } from "./components/UserTypePickerInterface";
import { UserTypeConfirmModal } from "./components/UserTypeConfirmModal";

type Props = {
  onSelect: (userType: "COLLECTS_WASTE" | "PRODUCES_WASTE") => void;
};

const UserTypePicker = ({ onSelect }: Props) => {
  const { updateUser, user } = useUser();
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
      <GoogleUserWelcome user={user} />
      <AddPersonalInfo updateUser={updateUser} user={user} />
      <UserTypePickerInterface
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        handleSelect={handleSelect}
      />
      <UserTypeConfirmModal
        isModalVisible={isModalVisible}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default UserTypePicker;
