import React from "react";
import { Heading } from "@/components/ui/heading";
import { View } from "react-native";
import { Input, InputField } from "@/components/ui/input";

const QuantityInput = () => {
  return (
    <View>
      <Heading size="xs">Quantidade (em Kg) </Heading>
      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        className="mt-2 border border-zinc-300"
      >
        <InputField placeholder="Ex 5.5" />
      </Input>
    </View>
  );
};
export default QuantityInput;
