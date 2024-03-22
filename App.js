import { Image, Button, StatusBar, StyleSheet, Text, View } from "react-native";
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

  const escolherFoto = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

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
        <Image style={{ width: 300, height: 300 }} />
      </View>
    </>
  );
}
