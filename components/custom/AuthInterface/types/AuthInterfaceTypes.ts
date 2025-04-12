import { z } from "zod";
import { authSchema } from "../schemas";
import { Control, ControllerRenderProps } from "react-hook-form";

type AuthFormData = z.infer<typeof authSchema> & {
  firstName?: string;
  lastName?: string;
  userType?: string;
};

interface DynamicButtonProps {
  isLoading: boolean;
  isRegistering: boolean;
  handleSubmit: (
    callback: (data: AuthFormData) => Promise<void>
  ) => () => Promise<void>;
  handleAuth: (data: AuthFormData) => Promise<void>;
}

interface UserTypePickerProps {
  field: ControllerRenderProps<AuthFormData, "userType">;
  setShowUserTypePicker: (show: boolean) => void;
  showUserTypePicker: boolean;
  isLoading: boolean;
}

interface DynamicUserActionProps {
  isRegistering: boolean;
  toggleAuthMode: () => void;
}

interface RegisterUserProps {
  setShowUserTypePicker: (show: boolean) => void;
  showUserTypePicker: boolean;
  isLoading: boolean;
  control: Control<AuthFormData, any>;
  errors: any;
}

interface DynamicFormProps {
  isRegistering: boolean;
  setShowUserTypePicker: (show: boolean) => void;
  isLoading: boolean;
  control: any;
  showUserTypePicker: boolean;
  errors: any;
  handleAuth: (data: AuthFormData) => Promise<void>;
  handleSubmit: (
    callback: (data: AuthFormData) => Promise<void>
  ) => () => Promise<void>;
  toggleAuthMode: () => void;
  setShowPassword: (show: boolean) => void;
  showPassword: boolean;
}

export {
  AuthFormData,
  DynamicButtonProps,
  UserTypePickerProps,
  DynamicUserActionProps,
  RegisterUserProps,
  DynamicFormProps,
};
