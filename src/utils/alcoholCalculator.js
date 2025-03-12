// Przykładowa baza danych z alkoholem (ceny i procenty)
const alcoholData = [
  {
    name: "Tyskie Gronie",
    type: "Piwo",
    percentage: 5.2,
    volume: 500,
    price: 3.99,
    taste: "Klasyczne, lekko chmielowe",
    exclusivity: "Niski",
  },
  {
    name: "Żywiec Jasne Pełne",
    type: "Piwo",
    percentage: 5.6,
    volume: 500,
    price: 4.49,
    taste: "Goryczkowe z nutą słodu",
    exclusivity: "Niski",
  },
  {
    name: "Lech Premium",
    type: "Piwo",
    percentage: 5,
    volume: 500,
    price: 3.89,
    taste: "Orzeźwiające, delikatnie chmielowe",
    exclusivity: "Niski",
  },
  {
    name: "Jack Daniel's",
    type: "Whisky",
    percentage: 40,
    volume: 700,
    price: 99.99,
    taste: "Dymne z nutą wanilii i dębu",
    exclusivity: "Średni",
  },
  {
    name: "Ballantine's Finest",
    type: "Whisky",
    percentage: 40,
    volume: 700,
    price: 79.99,
    taste: "Łagodna, z nutą miodu i wanilii",
    exclusivity: "Średni",
  },
  {
    name: "Johnnie Walker Red Label",
    type: "Whisky",
    percentage: 40,
    volume: 700,
    price: 89.99,
    taste: "Pikantna, z nutą cynamonu",
    exclusivity: "Średni",
  },
  {
    name: "Chopin Vodka",
    type: "Wódka",
    percentage: 40,
    volume: 700,
    price: 129.99,
    taste: "Delikatna, ziemniaczana z nutą kremową",
    exclusivity: "Wysoki",
  },
  {
    name: "Finlandia Vodka",
    type: "Wódka",
    percentage: 40,
    volume: 700,
    price: 59.99,
    taste: "Czysta, z delikatnym posmakiem cytrusów",
    exclusivity: "Średni",
  },
  {
    name: "Soplica Wiśniowa",
    type: "Nalewka",
    percentage: 30,
    volume: 500,
    price: 24.99,
    taste: "Słodka, intensywnie wiśniowa",
    exclusivity: "Niski",
  },
  {
    name: "Jägermeister",
    type: "Likier",
    percentage: 35,
    volume: 700,
    price: 69.99,
    taste: "Ziołowy z nutą anyżu",
    exclusivity: "Średni",
  },
  {
    name: "Baileys Irish Cream",
    type: "Likier",
    percentage: 17,
    volume: 700,
    price: 64.99,
    taste: "Kremowy, czekoladowy z nutą wanilii",
    exclusivity: "Średni",
  },
  {
    name: "Martini Bianco",
    type: "Wermut",
    percentage: 15,
    volume: 1000,
    price: 39.99,
    taste: "Aromatyczne, ziołowo-kwiatowe",
    exclusivity: "Średni",
  },
  {
    name: "Campo Viejo Rioja",
    type: "Wino",
    percentage: 13.5,
    volume: 750,
    price: 45.99,
    taste: "Owocowe, z nutą wiśni i śliwek",
    exclusivity: "Średni",
  },
  {
    name: "Fresco Semi Sweet",
    type: "Wino",
    percentage: 10,
    volume: 750,
    price: 19.99,
    taste: "Słodkie z owocowym aromatem",
    exclusivity: "Niski",
  },
  {
    name: "Moët & Chandon Brut Imperial",
    type: "Szampan",
    percentage: 12,
    volume: 750,
    price: 249.99,
    taste: "Rześkie z nutą jabłek i cytrusów",
    exclusivity: "Wysoki",
  },
];

// Funkcja obliczająca najbardziej opłacalny wybór
export const calculateBestAlcohol = (budget) => {
  const results = alcoholData.map((alcohol) => {
    const totalVolume = Math.floor(budget / alcohol.price) * alcohol.volume;
    const totalUnits = totalVolume * (alcohol.percentage / 100);
    return { ...alcohol, totalVolume, totalUnits };
  });

  // Sortowanie po największej ilości jednostek alkoholu za daną kwotę
  return results.sort((a, b) => b.totalUnits - a.totalUnits);
};
