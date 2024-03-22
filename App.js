import {
  Image,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";

/* Importando os recursos nativos */
import * as ImagePicker from "expo-image-picker";

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
        {foto ? (
          <Image style={{ width: 300, height: 300 }} source={{ uri: foto }} />
        ) : (
          <Text>Você Ainda não Escolheu uma foto</Text>
        )}
      </View>
    </>
  );
}
