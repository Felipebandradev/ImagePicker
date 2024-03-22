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
        <Button title="Escolher Foto" />
        <Image style={{ width: 300, height: 300 }} />
      </View>
    </>
  );
}
