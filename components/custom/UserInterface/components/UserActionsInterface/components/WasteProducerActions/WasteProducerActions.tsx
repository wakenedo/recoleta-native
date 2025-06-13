import { CreateCollectModal } from "@/components/custom/CreateCollectModal";
import { CollectFlowProvider } from "@/context/CollectFlowContext";
import React, { FC } from "react";
import { ScrollView, Button, View } from "react-native";
import { WasteProducerActionsProps } from "../../../types";

const WasteProducerActions: FC<WasteProducerActionsProps> = ({
  showModal,
  setShowModal,
}) => {
  return (
    <ScrollView className="w-full">
      <View className="mb-2">
        <Button title="Criar Coleta" onPress={() => setShowModal(true)} />
      </View>
      <Button
        title="Editar Coletas Agendadas"
        onPress={() => console.log("Editar Coletas Agendadas Clickado!")}
      />

      <CollectFlowProvider>
        <CreateCollectModal
          visible={showModal}
          onClose={() => setShowModal(false)}
        />
      </CollectFlowProvider>
    </ScrollView>
  );
};
export default WasteProducerActions;
