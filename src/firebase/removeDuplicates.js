import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./config";

export const removeDuplicates = async () => {
  try {
    console.log("Rozpoczynam wyszukiwanie duplikatów...");

    // Pobierz wszystkie dokumenty
    const querySnapshot = await getDocs(collection(db, "alcohols"));
    const alcohols = [];
    const duplicates = [];
    const uniqueKeys = new Map();

    // Znajdź duplikaty
    querySnapshot.forEach((document) => {
      const data = document.data();
      const key = `${data.name.toLowerCase()}_${data.type.toLowerCase()}`;

      if (uniqueKeys.has(key)) {
        // To jest duplikat
        duplicates.push({
          id: document.id,
          name: data.name,
          type: data.type,
        });
      } else {
        // To jest unikalny dokument
        uniqueKeys.set(key, document.id);
        alcohols.push({
          id: document.id,
          ...data,
        });
      }
    });

    console.log(`Znaleziono ${duplicates.length} duplikatów.`);

    // Usuń duplikaty
    if (duplicates.length > 0) {
      console.log("Usuwam duplikaty...");

      for (const duplicate of duplicates) {
        console.log(
          `Usuwam: ${duplicate.name} (${duplicate.type}), ID: ${duplicate.id}`
        );
        await deleteDoc(doc(db, "alcohols", duplicate.id));
      }

      console.log("Wszystkie duplikaty zostały usunięte!");
    } else {
      console.log("Brak duplikatów do usunięcia.");
    }

    return {
      success: true,
      removed: duplicates.length,
      remaining: alcohols.length,
    };
  } catch (error) {
    console.error("Błąd podczas usuwania duplikatów:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
