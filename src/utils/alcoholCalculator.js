// Przykładowa baza danych z alkoholem (ceny i procenty)
const alcoholData = [
  { name: "Piwo", volume: 500, percentage: 5, price: 4.5 },
  { name: "Wódka", volume: 700, percentage: 40, price: 30 },
  { name: "Whisky", volume: 700, percentage: 40, price: 80 },
  { name: "Wino", volume: 750, percentage: 12, price: 25 },
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
