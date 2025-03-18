import React from "react";
import { Button } from "react-native";
import { useAuth } from "../context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Login from "./Login";
import "../../global.css";

const Stack = createNativeStackNavigator();

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <Stack.Navigator>
      {authState?.authenticated ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
          }}
        />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};
