
import { ScrollView, StyleSheet, Text } from "react-native";
import KartaDetyres from "./components/KartaDetyres";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulli}>Detyrat e mia</Text>

      <KartaDetyres
        titulli="Detyra e parë"
        pershkrimi="Përgatitja e projektit Java 2"
        statusi="Në pritje"
        prioriteti="I lartë"
      />

      <KartaDetyres
        titulli="Detyra e dytë"
        pershkrimi="Leximi i materialeve"
        statusi="Përfunduar"
      />

      <KartaDetyres
        titulli="Detyra e tretë"
        pershkrimi="Përgatitja për ushtrime"
        statusi="Në pritje"
        prioriteti="Mesatar"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  titulli: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
