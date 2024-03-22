import { Image, Button, StatusBar, StyleSheet, Text, View } from "react-native";

export default function App() {
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
