// ImagePickerComponent.tsx
import React, { useState } from "react";
import { Button, Image, Alert } from "react-native";
import { launchCamera, launchImageLibrary, ImagePickerResponse } from "react-native-image-picker";

interface ImagePickerComponentProps {
  onImagePicked: (uri: string) => void;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({ onImagePicked }) => {
  const [imageUri, setImageUri] = useState<string>('');

  const handleCaptureImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
        cameraType: 'back',
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('Usuário cancelou');
        } else if (response.errorCode) {
          console.log('Erro: ', response.errorMessage);
          Alert.alert('Erro', 'Ocorreu um erro ao tentar capturar a imagem.');
        } else if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || '');  // Acessando a URI com segurança
          onImagePicked(response.assets[0].uri || '');  // Acessando a URI com segurança
        } else {
          console.log("Nenhuma imagem foi capturada.");
        }
      }
    );
  };

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: false,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('Usuário cancelou');
        } else if (response.errorCode) {
          console.log('Erro: ', response.errorMessage);
          Alert.alert('Erro', 'Ocorreu um erro ao tentar selecionar a imagem.');
        } else if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || '');  // Acessando a URI com segurança
          onImagePicked(response.assets[0].uri || '');  // Acessando a URI com segurança
        } else {
          console.log("Nenhuma imagem foi selecionada.");
        }
      }
    );
  };

  return (
    <>
      <Button title="Capturar Foto" onPress={handleCaptureImage} />
      <Button title="Selecionar da Galeria" onPress={handleSelectImage} />
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />
      ) : null}
    </>
  );
};

export default ImagePickerComponent;
