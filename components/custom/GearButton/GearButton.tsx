import React, { FC } from "react";
import { GearButtonProps } from "@/components/types";
import { Settings } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const GearButton: FC<GearButtonProps> = ({
  setShowActions,
  showActions,
  isProducesWaste,
  isCollectsWaste,
}) => {
  const handleGearColor = () => {
    if (isProducesWaste && !isCollectsWaste) {
      return "#c2410c"; // Orange color
    } else if (!isProducesWaste && isCollectsWaste) {
      return "#15803d"; // Green color
    }
    return "#000"; // Default color
  };
  return (
    <TouchableOpacity
      className="mb-1"
      onPress={() => setShowActions(!showActions)}
    >
      <Settings size={20} color={handleGearColor()} />
    </TouchableOpacity>
  );
};
export default GearButton;
