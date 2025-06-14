import { Heading } from "@/components/ui/heading";
import React, { FC } from "react";
import { Button, Image, Platform, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TakeResiduePhotoProps } from "../types";

const TakeResiduePhoto: FC<TakeResiduePhotoProps> = ({ photo, setPhoto }) => {
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permissão para usar a câmera foi negada.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permissão para acessar a galeria foi negada.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <View className={`${Platform.OS != "windows" ? "mt-6" : ""}`}>
      <Heading size="xs">Adicione Foto do Resíduo</Heading>

      <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
        <Button title="Tirar Foto" onPress={openCamera} />
        <Button title="Selecionar da Galeria" onPress={openGallery} />
      </View>

      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
      )}
    </View>
  );
};

export default TakeResiduePhoto;
