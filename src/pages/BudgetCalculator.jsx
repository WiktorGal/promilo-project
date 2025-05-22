import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

// Twój obiekt alcoholIcons pozostaje bez zmian
const alcoholIcons = {
  piwo: { icon: "🍺", label: "Piwo" },
  wódka: { icon: "🥃", label: "Wódka" },
  whisky: { icon: "🥃", label: "Whisky" },
  wino: { icon: "🍷", label: "Wino" },
  szampan: { icon: "🥂", label: "Szampan" },
  likier: { icon: "🍸", label: "Likier" },
  nalewka: { icon: "🍷", label: "Nalewka" },
  wermut: { icon: "🍸", label: "Wermut" },
  koniak: { icon: "🥃", label: "Koniak" },
  tequila: { icon: "🥃", label: "Tequila" },
  rum: { icon: "🥃", label: "Rum" },
  gin: { icon: "🍸", label: "Gin" },
  absynt: { icon: "🍸", label: "Absynt" },
  cydr: { icon: "🍺", label: "Cydr" },
  "miód pitny": { icon: "🍯", label: "Miód pitny" },
};

// Poziomy ekskluzywności
const exclusivityLevels = {
  niski: { label: "Niski", color: "bg-green-100" },
  średni: { label: "Średni", color: "bg-yellow-100" },
  wysoki: { label: "Wysoki", color: "bg-red-100" },
  "bardzo wysoki": { label: "Bardzo wysoki", color: "bg-purple-100" },
};

function formatVolume(ml) {
  if (ml >= 1000) {
    return `${(ml / 1000).toFixed(2)} l`;
  }
  return `${ml} ml`;
}

const BudgetCalculator = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedExclusivity, setSelectedExclusivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alcohols, setAlcohols] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Pobierz dane z Firestore przy pierwszym renderowaniu
  useEffect(() => {
    const fetchAlcohols = async () => {
      try {
        setDataLoading(true);
        const querySnapshot = await getDocs(collection(db, "alcohols"));
        const alcoholList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Normalizacja typów do małych liter
            type: data.type.toLowerCase(),
            exclusivity: data.exclusivity.toLowerCase(),
          };
        });
        setAlcohols(alcoholList);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
        setError(
          "Nie udało się pobrać danych z bazy. Spróbuj odświeżyć stronę."
        );
      } finally {
        setDataLoading(false);
      }
    };

    fetchAlcohols();
  }, []);

  const handleTypeToggle = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleExclusivityToggle = (level) => {
    if (selectedExclusivity.includes(level)) {
      setSelectedExclusivity(selectedExclusivity.filter((l) => l !== level));
    } else {
      setSelectedExclusivity([...selectedExclusivity, level]);
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const budgetValue = parseFloat(budget);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      setError("Podaj poprawną kwotę!");
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      // Oblicz najlepsze opcje na podstawie danych z Firestore
      const bestChoices = alcohols
        .map((alcohol) => {
          const numUnits = Math.floor(budgetValue / alcohol.price);
          const totalVolume = numUnits * alcohol.volume;
          const totalAlcoholMl = totalVolume * (alcohol.percentage / 100);
          const standardUnitMl = 12.5;
          const totalUnits = totalAlcoholMl / standardUnitMl;
          const costPerAlcoholUnit =
            totalUnits > 0 ? (numUnits * alcohol.price) / totalUnits : 0;

          return {
            ...alcohol,
            numUnits,
            totalVolume,
            totalUnits,
            costPerAlcoholUnit,
          };
        })
        .sort((a, b) => b.totalUnits - a.totalUnits);

      setResults(bestChoices);

      if (bestChoices.length === 0) {
        setError("Nie znaleziono opłacalnych opcji dla podanego budżetu.");
      }
    } catch (error) {
      console.error("Błąd podczas obliczania:", error);
      setError("Wystąpił błąd podczas obliczania. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  // Memoizacja przefiltrowanych wyników
  const filteredResults = useMemo(() => {
    if (!results.length) return [];

    return results
      .filter((item) => Math.floor(budget / item.price) > 0)
      .filter(
        (item) =>
          selectedTypes.length === 0 || selectedTypes.includes(item.type)
      )
      .filter(
        (item) =>
          selectedExclusivity.length === 0 ||
          selectedExclusivity.includes(item.exclusivity)
      );
  }, [results, budget, selectedTypes, selectedExclusivity]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Kontener z pozycjonowaniem względnym */}
        <div className="relative mb-4">
          {/* Przycisk cofania - pozycjonowany absolutnie po lewej */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Tytuł - wyśrodkowany */}
          <h2 className="text-2xl font-bold text-center">
            Kalkulator Sponiewierania
          </h2>
        </div>
        {/* Wskaźnik ładowania danych */}
        {dataLoading ? (
          <div className="text-center mb-4">
            <p>Ładowanie danych alkoholi...</p>
          </div>
        ) : (
          <>
            {/* Pasek z ikonkami do filtrowania typów alkoholu */}
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {Object.entries(alcoholIcons).map(([type, { icon, label }]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeToggle(type.toLowerCase())}
                  className={`flex flex-col items-center px-2 py-1 rounded-lg border 
                    ${
                      selectedTypes.includes(type.toLowerCase())
                        ? "bg-green-200 border-green-500"
                        : "bg-white border-gray-300"
                    } 
                    hover:bg-green-100 transition`}
                >
                  <span className="text-lg">{icon}</span>
                  <span className="text-xs mt-1">{label}</span>
                </button>
              ))}
            </div>

            {/* Filtry ekskluzywności */}
            <div className="mt-3 mb-4">
              <p className="text-sm text-gray-600 mb-2 text-center">
                Poziom ekskluzywności:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.entries(exclusivityLevels).map(
                  ([level, { label, color }]) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() =>
                        handleExclusivityToggle(level.toLowerCase())
                      }
                      className={`px-2 py-1 rounded-lg border text-sm
                      ${
                        selectedExclusivity.includes(level.toLowerCase())
                          ? "bg-blue-200 border-blue-500"
                          : `${color} border-gray-300`
                      } 
                      hover:bg-blue-100 transition`}
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
            </div>

            <form onSubmit={handleCalculate} className="flex flex-col gap-4">
              <label htmlFor="budget" className="text-left font-semibold">
                Budżet (PLN)
              </label>
              <input
                id="budget"
                type="number"
                min="1"
                placeholder="Podaj swój budżet"
                value={budget}
                onChange={(e) => {
                  setBudget(e.target.value);
                  setResults([]);
                  setError("");
                }}
                className="border p-2 rounded-lg w-full"
              />
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                disabled={
                  !budget ||
                  isNaN(parseFloat(budget)) ||
                  parseFloat(budget) <= 0 ||
                  loading
                }
              >
                {loading ? "Obliczam..." : "Oblicz"}
              </button>
            </form>
          </>
        )}

        {error && <div className="mt-2 text-red-500 text-center">{error}</div>}

        {results.length > 0 && !error && (
          <div className="max-h-72 overflow-y-auto rounded-lg border border-gray-200 shadow-inner bg-gray-50 mt-4">
            {filteredResults.length === 0 ? (
              <div className="p-4 text-center">
                <p className="text-lg font-semibold text-gray-600">
                  Uuu, za tyle to my się nie napijemy!
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Spróbuj zmienić filtry lub zwiększyć budżet.
                </p>
                <span className="text-4xl mt-3 block">🥲</span>
              </div>
            ) : (
              <ul className="space-y-2 p-2">
                {filteredResults.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 border rounded-lg bg-white flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {alcoholIcons[item.type]?.icon || "🍹"}
                      </span>
                      <span className="font-semibold">{item.name}</span>
                      <span
                        className={`text-xs ml-auto px-2 py-0.5 rounded-full ${
                          exclusivityLevels[item.exclusivity]?.color ||
                          "bg-gray-100"
                        }`}
                      >
                        {item.exclusivity}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 ml-8">
                      Cena 1 szt.: <b>{item.price.toFixed(2)} zł</b>
                      <br />
                      Możesz kupić: <b>{item.numUnits}</b> szt.
                      <br />
                      Łącznie: <b>{formatVolume(item.totalVolume)}</b> (
                      {item.totalUnits.toFixed(2)} jednostek alkoholu)
                      <br />
                      Koszt 1 jednostki alkoholu:{" "}
                      <b>{item.costPerAlcoholUnit.toFixed(2)} zł</b>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetCalculator;
