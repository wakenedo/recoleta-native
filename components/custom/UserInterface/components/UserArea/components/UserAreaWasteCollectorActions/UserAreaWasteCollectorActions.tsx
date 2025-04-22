import React from "react";
import { View, Button } from "react-native";
const UserAreaWasteCollectsActions = () => {
  return (
    <View>
      <View className="mb-2">
        <Button
          title="Button 1"
          onPress={() => console.log("Button 1 Clicado")}
        />
      </View>
      <View className="mb-2">
        <Button
          title="Button 2"
          onPress={() => console.log("Button 2 Clicado")}
        />
      </View>
      <View className="mb-2">
        <Button
          title="Button 3"
          onPress={() => console.log("Button 3 Clicado")}
        />
      </View>
    </View>
  );
};
export default UserAreaWasteCollectsActions;
