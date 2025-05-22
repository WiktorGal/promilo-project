import { collection, addDoc } from "firebase/firestore";
import { db } from "./config";

const alcoholData = [
  // Piwa
  {
    name: "Tyskie Gronie",
    type: "Piwo",
    percentage: 5.2,
    volume: 500,
    price: 3.99,
    taste: "Klasyczne, lekko chmielowe",
    exclusivity: "Niski",
  },
];

// Funkcja do dodawania danych do Firestore
export const seedDatabase = async () => {
  try {
    console.log("Rozpoczynam dodawanie danych do Firestore...");

    for (const alcohol of alcoholData) {
      console.log(`Dodaję ${alcohol.name}...`);
      await addDoc(collection(db, "alcohols"), alcohol);
      console.log(`Dodano ${alcohol.name} do bazy danych`);
    }

    console.log("Wszystkie dane zostały dodane do Firestore!");
    return true;
  } catch (error) {
    console.error("Błąd podczas dodawania danych:", error);
    return false;
  }
};
