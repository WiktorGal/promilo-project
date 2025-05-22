// src/firebase/DatabaseSeeder.jsx
import React, { useState } from "react";
import { seedDatabase } from "./seedDatabase"; // Upewnij się, że ścieżka jest poprawna

const DatabaseSeeder = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSeedDatabase = async () => {
    setLoading(true);
    setMessage("Dodawanie danych do bazy...");

    try {
      const result = await seedDatabase();
      if (result) {
        setMessage("Dane zostały pomyślnie dodane do bazy!");
      } else {
        setMessage("Wystąpił błąd podczas dodawania danych.");
      }
    } catch (error) {
      console.error("Błąd:", error);
      setMessage(`Błąd: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-2">Narzędzie administratora</h3>
      <p className="text-sm mb-2">
        Użyj tego przycisku, aby dodać dane alkoholi do bazy Firestore.
      </p>
      <button
        onClick={handleSeedDatabase}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Dodawanie..." : "Dodaj dane do Firestore"}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default DatabaseSeeder;
