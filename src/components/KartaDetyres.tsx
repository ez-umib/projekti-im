
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
      <View style={styles.rreshti}>
        <View style={styles.permbajtja}>
          <Text style={styles.titulli}>{titulli}</Text>
          <Text style={styles.pershkrimi}>{pershkrimi}</Text>
        </View>

        <Text style={styles.ikona}>
          {ePerfunduar ? "✓" : "○"}
        </Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.statusi}>
          {ePerfunduar ? "Completed" : "Pending"}
        </Text>
      </View>

      {prioriteti ? (
        <Text style={styles.prioriteti}>
          Priority: {prioriteti}
        </Text>
      ) : null}

      <Text style={styles.udhezimi}>
        Tap the card to update its status
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  karta: {
    backgroundColor: "#EFF6FF",
    padding: 18,
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  kartaPerfunduar: {
    backgroundColor: "#DCFCE7",
    borderColor: "#86EFAC",
  },
  rreshti: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  permbajtja: {
    flex: 1,
    marginRight: 12,
  },
  titulli: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 6,
  },
  pershkrimi: {
    fontSize: 14,
    color: "#475569",
  },
  ikona: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#15803D",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 14,
  },
  statusi: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#334155",
  },
  prioriteti: {
    marginTop: 10,
    fontSize: 13,
    color: "#334155",
  },
  udhezimi: {
    marginTop: 12,
    fontSize: 11,
    color: "#64748B",
  },
});