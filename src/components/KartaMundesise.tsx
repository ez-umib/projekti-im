import { diteDeriAfatit, Mundesi } from "@/data/mundesite";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function KartaMundesise({ mundesi }: { mundesi: Mundesi }) {
  const dite = diteDeriAfatit(mundesi.afati);
  const ngutshem = dite >= 0 && dite <= 30;

  return (
   <Link href={{ pathname: "/mundesi/[id]", params: { id: mundesi.id } }} asChild>
      <Pressable style={styles.karta}>
        <Text style={styles.kategoria}>
          {mundesi.kategoria} · {mundesi.shteti}
        </Text>
        <Text style={styles.titulli}>{mundesi.titulli}</Text>
        <View style={[styles.afati, ngutshem && styles.afatiNgutshem]}>
          <Text style={ngutshem ? styles.tekstNgutshem : undefined}>
            {dite < 0 ? "Afati ka kaluar" : `Afati: ${mundesi.afati} · ${dite} ditë`}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  karta: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  kategoria: { fontSize: 13, color: "#666" },
  titulli: { fontSize: 18, fontWeight: "bold", marginVertical: 6 },
  afati: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  afatiNgutshem: { backgroundColor: "#ffe0e0" },
  tekstNgutshem: { color: "#c00", fontWeight: "bold" },
});