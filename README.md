# Mundësitë jashtë vendit

Aplikacion mobil që i ndihmon studentët t'i gjejnë në një vend mundësitë ndërkombëtare
(Erasmus+, bursa, praktika dhe shkolla verore) dhe të mos e humbin asnjë afat aplikimi.

## Funksionalitetet

- Lista e mundësive, e renditur sipas afatit
- Filtrimi sipas kategorisë
- Theksimi i afateve që po afrohen (30 ditë ose më pak)
- Ekrani i detajeve me afatin dhe dokumentet e nevojshme
- Rikujtim me njoftim lokal 3 ditë para afatit

## Si ta nisni

```bash
npm install
npx expo start
```

Skanoni kodin QR me aplikacionin Expo Go në telefon.

## Struktura

```
src/
├─ app/
│  ├─ index.tsx          # lista e mundësive
│  ├─ mundesi/[id].tsx   # detajet dhe njoftimi
│  └─ _layout.tsx        # navigimi (Stack)
├─ components/
│  └─ KartaMundesise.tsx # karta e një mundësie
└─ data/
   └─ mundesite.ts       # të dhënat dhe funksionet ndihmëse
```

## Dokumentacioni

- [EKIPI.md](EKIPI.md): anëtarët dhe ideja
- [HARTA.md](HARTA.md): rrjedha e përdoruesit dhe MVP
- [BISEDAT.md](BISEDAT.md): bisedat me përdoruesit
- [PITCH.md](PITCH.md): prezantimi

## Ekipi

- Erza Zejnullahu (ez-umib)
- Hata Zeka (hatezeka)