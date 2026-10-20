
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  titulli: string;
  pershkrimi: string;
  statusi: "Në pritje" | "Përfunduar";
  prioriteti?: string;
};

export default function KartaDetyres({
  titulli,
  pershkrimi,
  statusi,
  prioriteti,
}: Props) {
  const [ePerfunduar, setEPerfunduar] = useState(
    statusi === "Përfunduar"
  );

  return (
    <Pressable
      onPress={() => setEPerfunduar(!ePerfunduar)}
      style={[
        styles.karta,
        ePerfunduar && styles.kartaPerfunduar,
      ]}
    >
      <Text style={styles.titulli}>{titulli}</Text>
      <Text>{pershkrimi}</Text>
      <Text>
        Statusi: {ePerfunduar ? "Përfunduar" : "Në pritje"}
      </Text>
      {prioriteti ? <Text>Prioriteti: {prioriteti}</Text> : null}
      <Text style={styles.udhezimi}>Preke kartën për ndryshim</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  karta: {
    backgroundColor: "#e0f2fe",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  kartaPerfunduar: {
    backgroundColor: "#bbf7d0",
  },
  titulli: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  udhezimi: {
    marginTop: 8,
    fontSize: 12,
  },
});
