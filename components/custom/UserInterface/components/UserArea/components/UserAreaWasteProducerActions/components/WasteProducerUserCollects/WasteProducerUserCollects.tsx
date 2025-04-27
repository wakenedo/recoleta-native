import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import React, { FC, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UserRegisteredCollectsCard } from "./components/UserRegisteredCollectsCard";
import { WasteProducerUserCollectsProps } from "../../types";

const WasteProducerUserCollects: FC<WasteProducerUserCollectsProps> = ({
  collects,
  visible,
  onClose,
  loading,
  error,
}) => {
  const handleClose = () => {
    onClose();
  };

  // Log when data is passed
  console.log("Collects data:", collects);

  // Render each item in the FlatList
  const renderCollectItem = useCallback(({ item }: any) => {
    console.log("Rendering item:", item); // Log the item being rendered
    return <UserRegisteredCollectsCard item={item} />;
  }, []);

  const ITEM_HEIGHT = 100;

  const getItemLayout = (_data: any, index: any) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  // Log when FlatList is being scrolled
  const handleScroll = (event: any) => {
    console.log("Scrolling event:", event.nativeEvent.contentOffset.y);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <BlurView
        intensity={90}
        tint="regular"
        className="flex-1 px-3 pt-2 bg-red-100"
      >
        <View className="flex-1 bg-white rounded-md p-4">
          <View className="w-full items-end mb-2">
            <TouchableOpacity
              onPress={handleClose}
              className="p-2 rounded-full bg-zinc-100"
            >
              <X size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <Text className="text-lg font-bold mb-2">Coletas Cadastradas</Text>
          <Text className="text-sm text-gray-600 mb-2">
            Aqui estão as coletas que você cadastrou.
          </Text>

          {error && <Text className="text-red-500 mt-2">{error}</Text>}
          {loading && <ActivityIndicator size="large" color="#4B9CD3" />}
          {!loading && collects.length === 0 && (
            <Text className="text-gray-500 mt-2">
              Nenhuma coleta cadastrada ainda.
            </Text>
          )}

          <FlatList
            data={collects}
            renderItem={renderCollectItem}
            keyExtractor={(item) => item._id.toString()}
            getItemLayout={getItemLayout}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            contentContainerStyle={{ paddingBottom: 10 }}
            className="flex-1"
          />
        </View>
      </BlurView>
    </Modal>
  );
};

export default WasteProducerUserCollects;
