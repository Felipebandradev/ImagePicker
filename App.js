import {
  Image,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  Vibration,
} from "react-native";
import { useEffect, useState } from "react";

/* Importando os recursos nativos da Api Móvel */
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

export default function App() {
  /*  State tradicional para armazenar a refêrencia da foto(quando existir) */
  const [foto, setFoto] = useState(null);
  /* State de checagem de permissões de uso (através do hook camera permissions) */
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  console.log(status);

  /* Ao entrar no app, será executada a verificação de perimssões de uso  */
  useEffect(() => {
    /*  Esta função mostrará um popup para o usuário perguntando
    se ele autoriza a utilização do recurso móvel (no caso, selecionar/tirar foto). */
    async function verificaPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

      /*  Ele dando autorização (granted), isso será armazenado
      no state de requestPermission. */

      requestPermission(cameraStatus === "granted");
    }

    verificaPermissoes();
  }, []);

  /* Ao pressionar o botão, executa esta função: */
  const escolherFoto = async () => {
    if (!status === "granted") {
      Alert.alert("Permissão Imagem negada");
      return;
    }

    /* Acessando via ImagePicker a biblioteca 
    para seleção de apenas imagens, com recurso de edição habilitado,
    proporção 16,9 e qualidade total. */
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    /* Se o usuário não cancelar a operação, pegamos a 
    imagem e colocamos no state */
    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  console.log(foto);

  const acessarCamera = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log(imagem);

    if (!imagem.canceled) {
      /* Usando a Api media library para salvar o armazenamento físico do dispositivo */
      await MediaLibrary.saveToLibraryAsync(imagem.assets[0].uri);
      setFoto(imagem.assets[0].uri);
    }
  };

  const compartilharFoto = async () => {
    await Sharing.shareAsync(foto);
  };

  return (
    <>
      <StatusBar />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onPress={escolherFoto} title="Escolher Foto" />

        <Button onPress={acessarCamera} title="Tirar uma nova foto" />
        {foto ? (
          <>
            <Image style={{ width: 300, height: 300 }} source={{ uri: foto }} />
            <Button onPress={compartilharFoto} title="Compartilhar Foto" />
          </>
        ) : (
          <Text>Você Ainda não Escolheu uma foto</Text>
        )}
      </View>
    </>
  );
}
