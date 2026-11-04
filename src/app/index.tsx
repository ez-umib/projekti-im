import KartaMundesise from "@/components/KartaMundesise";
import { Kategoria, Mundesi, mundesite } from "@/data/mundesite";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const kategorite: (Kategoria | "Të gjitha")[] = [
  "Të gjitha",
  "Erasmus+",
  "Bursë",
  "Praktikë",
  "Shkollë verore",
];

type Artikull = {
  name: string;
  description: string;
};

type HomeListItem = Artikull | Mundesi;
type HomeSection = SectionListData<HomeListItem, { title: string }>;

function eshteArtikull(item: HomeListItem): item is Artikull {
  return "name" in item;
}

export default function Index() {
  const [zgjedhur, setZgjedhur] = useState<Kategoria | "Të gjitha">("Të gjitha");
  const [artikujt, setArtikujt] = useState<Artikull[]>([]);
  const [dukeNgarkuar, setDukeNgarkuar] = useState(true);
  const [gabimi, setGabimi] = useState<string | null>(null);
  const [rifreskimi, setRifreskimi] = useState(0);
  const [emriRi, setEmriRi] = useState("");
  const [pershkrimiRi, setPershkrimiRi] = useState("");
  const [dukeRuajtur, setDukeRuajtur] = useState(false);
  const [gabimiRuajtjes, setGabimiRuajtjes] = useState<string | null>(null);

  const lista = mundesite
    .filter((m) => zgjedhur === "Të gjitha" || m.kategoria === zgjedhur)
    .sort((a, b) => a.afati.localeCompare(b.afati)); // afati më i afërt i pari

  async function shtoArtikull() {
    const name = emriRi.trim();
    if (!name || dukeRuajtur) return;

    setDukeRuajtur(true);
    setGabimiRuajtjes(null);

    try {
      const { error } = await supabase.from("items").insert({
        name,
        description: pershkrimiRi.trim(),
      });

      if (error) {
        console.error("Dështoi ruajtja e artikullit:", error.message);
        setGabimiRuajtjes(error.message);
        return;
      }

      setEmriRi("");
      setPershkrimiRi("");
      setRifreskimi((vlera) => vlera + 1);
    } catch (error) {
      console.error("Dështoi ruajtja e artikullit:", error);
      setGabimiRuajtjes(
        error instanceof Error ? error.message : "Gabim i panjohur.",
      );
    } finally {
      setDukeRuajtur(false);
    }
  }

  useEffect(() => {
    let aktiv = true;

    async function ngarkoArtikujt() {
      setDukeNgarkuar(true);
      setGabimi(null);

      try {
        const { data, error } = await supabase
          .from("items")
          .select("name, description");

        if (error) {
          console.error("Dështoi leximi i tabelës items:", error.message);
          if (aktiv) setGabimi(error.message);
          return;
        }

        if (aktiv) setArtikujt(data ?? []);
      } catch (error) {
        console.error("Dështoi leximi i tabelës items:", error);
        if (aktiv) {
          setGabimi(
            error instanceof Error ? error.message : "Gabim i panjohur.",
          );
        }
      } finally {
        if (aktiv) setDukeNgarkuar(false);
      }
    }

    void ngarkoArtikujt();

    return () => {
      aktiv = false;
    };
  }, [rifreskimi]);

  const sections: HomeSection[] = [
    { title: "Artikujt", data: artikujt },
    { title: "Mundësitë jashtë vendit", data: lista },
  ];

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) =>
        eshteArtikull(item) ? `${item.name}-${index}` : item.id
      }
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View>
          <Text style={styles.titulli}>Shto artikull</Text>
          <TextInput
            accessibilityLabel="name"
            autoCapitalize="sentences"
            onChangeText={setEmriRi}
            placeholder="name"
            returnKeyType="next"
            style={styles.fusheTeksti}
            value={emriRi}
          />
          <TextInput
            accessibilityLabel="description"
            multiline
            onChangeText={setPershkrimiRi}
            placeholder="description"
            style={[styles.fusheTeksti, styles.fushePershkrimi]}
            textAlignVertical="top"
            value={pershkrimiRi}
          />
          <Pressable
            accessibilityRole="button"
            disabled={!emriRi.trim() || dukeRuajtur}
            onPress={() => void shtoArtikull()}
            style={[
              styles.butonShto,
              (!emriRi.trim() || dukeRuajtur) && styles.butonCaktivizuar,
            ]}
          >
            <Text style={styles.tekstButonit}>
              {dukeRuajtur ? "Duke ruajtur..." : "Shto"}
            </Text>
          </Pressable>
          {gabimiRuajtjes ? (
            <Text accessibilityRole="alert" style={styles.gabimi}>
              Nuk u ruajt artikulli: {gabimiRuajtjes}
            </Text>
          ) : null}
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
      renderSectionHeader={({ section }) => (
        <Text style={styles.titulliSeksionit}>{section.title}</Text>
      )}
      renderSectionFooter={({ section }) => {
        if (section.title !== "Artikujt") return null;

        if (dukeNgarkuar) {
          return (
            <View style={styles.status}>
              <ActivityIndicator />
              <Text>Po ngarkohen artikujt...</Text>
            </View>
          );
        }

        if (gabimi) {
          return (
            <View style={styles.status}>
              <Text style={styles.gabimi}>
                Nuk u ngarkuan artikujt: {gabimi}
              </Text>
              <Pressable
                onPress={() => setRifreskimi((vlera) => vlera + 1)}
                style={styles.provoPerseri}
              >
                <Text style={styles.tekstAktiv}>Provo përsëri</Text>
              </Pressable>
            </View>
          );
        }

        if (artikujt.length === 0) {
          return <Text style={styles.status}>Nuk ka artikuj.</Text>;
        }

        return null;
      }}
      renderItem={({ item }) =>
        eshteArtikull(item) ? (
          <View style={styles.kartaArtikullit}>
            <Text style={styles.emriArtikullit}>{item.name}</Text>
            <Text style={styles.pershkrimiArtikullit}>{item.description}</Text>
          </View>
        ) : (
          <KartaMundesise mundesi={item} />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60 },
  titulli: { fontSize: 26, fontWeight: "bold", marginBottom: 12 },
  titulliSeksionit: { fontSize: 20, fontWeight: "bold", marginVertical: 12 },
  filtrat: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  filter: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  filterAktiv: { backgroundColor: "#1e4fa3" },
  tekstAktiv: { color: "#fff" },
  fusheTeksti: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  fushePershkrimi: { minHeight: 88 },
  butonShto: {
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#1e4fa3",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  butonCaktivizuar: { opacity: 0.5 },
  tekstButonit: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  kartaArtikullit: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  emriArtikullit: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  pershkrimiArtikullit: { fontSize: 15, lineHeight: 22, color: "#555" },
  status: { alignItems: "center", gap: 8, marginBottom: 12 },
  gabimi: { color: "#c00", textAlign: "center" },
  provoPerseri: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#1e4fa3",
  },
});