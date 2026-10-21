export type Kategoria = "Erasmus+" | "Bursë" | "Praktikë" | "Shkollë verore";

export type Mundesi = {
  id: string;
  titulli: string;
  kategoria: Kategoria;
  shteti: string;
  afati: string; // "VVVV-MM-DD"
  pershkrimi: string;
  dokumentet: string[];
};

// Shembuj – zëvendësojini me të dhëna reale
export const mundesite: Mundesi[] = [
  {
    id: "m1",
    titulli: "Erasmus+ semestri pranveror",
    kategoria: "Erasmus+",
    shteti: "Gjermani",
    afati: "2026-11-15",
    pershkrimi: "Një semestër studimi në një universitet partner.",
    dokumentet: ["CV (Europass)", "Letër motivimi", "Transkripta e notave", "Certifikatë gjuhe B2"],
  },
  {
    id: "m2",
    titulli: "Bursë për master",
    kategoria: "Bursë",
    shteti: "Austri",
    afati: "2026-12-01",
    pershkrimi: "Bursë e plotë për studime master.",
    dokumentet: ["CV", "Diploma", "2 letra rekomandimi", "Pasaporta"],
  },
  {
    id: "m3",
    titulli: "Praktikë verore në IT",
    kategoria: "Praktikë",
    shteti: "Holandë",
    afati: "2027-02-28",
    pershkrimi: "Praktikë 3-mujore me pagesë në një kompani softueri.",
    dokumentet: ["CV", "Portfolio / GitHub", "Letër motivimi"],
  },
  {
    id: "m4",
    titulli: "Shkollë verore për të dhëna",
    kategoria: "Shkollë verore",
    shteti: "Itali",
    afati: "2027-03-31",
    pershkrimi: "Dy javë kurs intensiv për Data Science.",
    dokumentet: ["CV", "Letër motivimi"],
  },
];

export function gjeMundesine(id: string) {
  return mundesite.find((m) => m.id === id);
}

export function diteDeriAfatit(afati: string) {
  const sot = new Date();
  sot.setHours(0, 0, 0, 0);
  const data = new Date(afati + "T00:00:00");
  return Math.ceil((data.getTime() - sot.getTime()) / (1000 * 60 * 60 * 24));
}