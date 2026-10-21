import KartaMundesise from "@/components/KartaMundesise";
import { Kategoria, mundesite } from "@/data/mundesite";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const kategorite: (Kategoria | "Të gjitha")[] = [
  "Të gjitha",
  "Erasmus+",
  "Bursë",
  "Praktikë",
  "Shkollë verore",
];

export default function Index() {
  const [zgjedhur, setZgjedhur] = useState<Kategoria | "Të gjitha">("Të gjitha");

  const lista = mundesite
    .filter((m) => zgjedhur === "Të gjitha" || m.kategoria === zgjedhur)
    .sort((a, b) => a.afati.localeCompare(b.afati)); // afati më i afërt i pari

  return (
    <FlatList
      data={lista}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View>
          <Text style={styles.titulli}>Mundësitë jashtë vendit</Text>
          <View style={styles.filtrat}>
            {kategorite.map((k) => (
              <Pressable
                key={k}
                onPress={() => setZgjedhur(k)}
                style={[styles.filter, zgjedhur === k && styles.filterAktiv]}
              >
                <Text style={zgjedhur === k ? styles.tekstAktiv : undefined}>{k}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      }
      ListEmptyComponent={<Text>Nuk ka mundësi në këtë kategori.</Text>}
      renderItem={({ item }) => <KartaMundesise mundesi={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60 },
  titulli: { fontSize: 26, fontWeight: "bold", marginBottom: 12 },
  filtrat: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  filter: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  filterAktiv: { backgroundColor: "#1e4fa3" },
  tekstAktiv: { color: "#fff" },
});