import React, { useState } from "react";
import { removeDuplicates } from "../firebase/removeDuplicates";

const DuplicateRemover = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleRemoveDuplicates = async () => {
    setLoading(true);
    try {
      const result = await removeDuplicates();
      setResult(result);
    } catch (error) {
      console.error("Błąd:", error);
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-2">Usuwanie duplikatów</h3>
      <p className="text-sm mb-2">
        Kliknij poniższy przycisk, aby znaleźć i usunąć duplikaty alkoholi z
        bazy danych.
      </p>
      <button
        onClick={handleRemoveDuplicates}
        disabled={loading}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400"
      >
        {loading ? "Usuwanie..." : "Usuń duplikaty"}
      </button>

      {result && (
        <div className="mt-4 p-3 rounded-lg bg-gray-50">
          {result.success ? (
            <div>
              <p className="text-green-600 font-semibold">
                Operacja zakończona pomyślnie!
              </p>
              <p>Usunięto duplikatów: {result.removed}</p>
              <p>Pozostało unikalnych alkoholi: {result.remaining}</p>
            </div>
          ) : (
            <p className="text-red-600">Błąd: {result.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DuplicateRemover;
