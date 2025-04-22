import React, { FC } from "react";
import { Button, View } from "react-native";
import { WasteProducerCenterActiveCollects } from "./components/WasteProducerCenterActiveCollects";
import { User } from "@/app/Home";

interface WasteProducerCenterInterfaceProps {
  user: User;
  hasCollects: boolean;
}

const WasteProducerCenterInterface: FC<WasteProducerCenterInterfaceProps> = ({
  user,
  hasCollects,
}) => {
  return (
    <View>
      <WasteProducerCenterActiveCollects hasCollects={hasCollects} />
    </View>
  );
};
export default WasteProducerCenterInterface;
