import { diteDeriAfatit, gjeMundesine } from "@/data/mundesite";
import * as Notifications from "expo-notifications";
import { useLocalSearchParams } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Detajet() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mundesi = gjeMundesine(id);

  if (!mundesi) {
    return <Text style={styles.container}>Mundësia "{id}" nuk u gjet.</Text>;
  }

  const dite = diteDeriAfatit(mundesi.afati);

  async function vendosNjoftimin() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Leja u refuzua", "Aktivizoni njoftimet te cilësimet.");
      return;
    }

    // 3 ditë para afatit, në orën 10:00
    const data = new Date(mundesi!.afati + "T10:00:00");
    data.setDate(data.getDate() - 3);

    if (data <= new Date()) {
      Alert.alert("Shumë vonë", "Afati është më pak se 3 ditë larg.");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Afati po afrohet!",
        body: `${mundesi!.titulli} – mbyllet më ${mundesi!.afati}`,
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: data },
    });

    Alert.alert("U ruajt", `Do të njoftoheni më ${data.toLocaleDateString()}.`);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.kategoria}>
        {mundesi.kategoria} · {mundesi.shteti}
      </Text>
      <Text style={styles.titulli}>{mundesi.titulli}</Text>
      <Text style={styles.pershkrimi}>{mundesi.pershkrimi}</Text>

      <Text style={styles.nentitull}>Afati i aplikimit</Text>
      <Text>
        {mundesi.afati} ({dite < 0 ? "ka kaluar" : `${dite} ditë mbetur`})
      </Text>

      <Text style={styles.nentitull}>Dokumentet që duhen</Text>
      {mundesi.dokumentet.map((d) => (
        <Text key={d} style={styles.dokument}>
          • {d}
        </Text>
      ))}

      {dite > 0 && (
        <Pressable style={styles.butoni} onPress={vendosNjoftimin}>
          <Text style={styles.tekstButoni}>Më njofto 3 ditë para afatit</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  kategoria: { color: "#666" },
  titulli: { fontSize: 24, fontWeight: "bold", marginVertical: 8 },
  pershkrimi: { fontSize: 16, marginBottom: 8 },
  nentitull: { fontSize: 18, fontWeight: "bold", marginTop: 16, marginBottom: 6 },
  dokument: { fontSize: 16, marginBottom: 4 },
  butoni: {
    backgroundColor: "#1e4fa3",
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
    alignItems: "center",
  },
  tekstButoni: { color: "#fff", fontWeight: "bold" },
});