import { User } from "@/types";

interface AddPersonalInfoProps {
  updateUser: (data: Partial<User>) => Promise<void>;
  user: User | null;
}

interface GoogleUserWelcomeProps {
  user: User | null;
}

interface UserTypeConfirmModalProps {
  isModalVisible: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}

interface GoogleUserTypePickerProps {
  handleSelect: (userType: "COLLECTS_WASTE" | "PRODUCES_WASTE") => void;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export {
  AddPersonalInfoProps,
  GoogleUserWelcomeProps,
  GoogleUserTypePickerProps,
  UserTypeConfirmModalProps,
};
