import { CreateCollectModal } from "@/components/custom/CreateCollectModal";
import { CollectFlowProvider } from "@/context/CollectFlowContext";
import React, { FC } from "react";
import { ScrollView, Button } from "react-native";

interface WasteProducerActionsProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const WasteProducerActions: FC<WasteProducerActionsProps> = ({
  showModal,
  setShowModal,
}) => {
  return (
    <ScrollView className="w-full">
      <Button title="Criar Coleta" onPress={() => setShowModal(true)} />

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
