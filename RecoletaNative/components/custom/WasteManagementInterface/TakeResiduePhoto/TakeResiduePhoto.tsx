// TakeResiduePhoto.tsx
import React, { useState } from "react";
import { Platform, View, Text, Image, Button } from "react-native";
import { Heading } from "@/components/ui/heading";
import ImagePickerComponent from "@/components/custom/WasteManagementInterface/TakeResiduePhoto/ImagePickerComponent"; // Importando o componente ImagePicker

const TakeResiduePhoto: React.FC = () => {
  const [imageUri, setImageUri] = useState<string>("");
  const [isImagePickerVisible, setIsImagePickerVisible] = useState<boolean>(false);

  const handleImagePicked = (uri: string) => {
    setImageUri(uri);
    setIsImagePickerVisible(false);  // Esconde o ImagePicker após selecionar ou capturar a imagem
  };

  // Função para abrir o ImagePicker
  const openImagePicker = () => {
    setIsImagePickerVisible(true);  // Torna o ImagePicker visível quando o botão for clicado
  };

  return (
    <View className={`${Platform.OS !== "windows" ? "mt-6" : ""}`}>
      <Heading size="xs">Adicione Foto do Resíduo</Heading>

      {/* Botão para abrir o ImagePicker */}
      <Button title="Escolher Foto" onPress={openImagePicker} />

      {/* Exibe o componente ImagePicker quando o botão for pressionado */}
      {isImagePickerVisible && (
        <ImagePickerComponent onImagePicked={handleImagePicked} />
      )}

      {/* Exibe a imagem selecionada/capturada */}
      {imageUri ? (
        <View style={{ marginTop: 20 }}>
          <Text>Imagem Selecionada:</Text>
          <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
        </View>
      ) : null}

      {/* Aqui vai o componente de relógio para o usuário escolher um horário. */}
    </View>
  );
};

export default TakeResiduePhoto;
