import React, { FC } from "react";
import { View } from "react-native";
import { BlurView } from "expo-blur";
import { GearMenuContainerProps } from "../../types";

const GearMenuContainer: FC<GearMenuContainerProps> = ({
  isWasteProducer,
  isWasteCollector,
  children,
}) => {
  return (
    <View
      className={`absolute top-10 right-4 mt-1 
                ${isWasteProducer && "bg-orange-400/60"}
                ${isWasteCollector && "bg-green-400/60"}
               bg-orange-400/60 px-2 py-1 rounded-sm shadow z-10`}
    >
      <BlurView
        intensity={40} // adjust the blur strength here (0 - 100)
        tint="light" // options: "light", "dark", or "default"
      />

      {children}
    </View>
  );
};
export default GearMenuContainer;
