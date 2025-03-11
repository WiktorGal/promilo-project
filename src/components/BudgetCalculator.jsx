import React, { useState } from "react";
import { calculateBestAlcohol } from "../utils/alcoholCalculator";

const BudgetCalculator = () => {
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState([]);

  const handleCalculate = (e) => {
    e.preventDefault();

    const budgetValue = parseFloat(budget);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      alert("Podaj poprawną kwotę!");
      return;
    }

    const bestChoices = calculateBestAlcohol(budgetValue);
    setResults(bestChoices);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        💰 Kalkulator Sponiewierania
      </h2>
      <form onSubmit={handleCalculate} className="flex flex-col gap-4">
        <input
          type="number"
          placeholder="Podaj swój budżet (PLN)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="border p-2 rounded-lg w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
        >
          Oblicz
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">
            Najbardziej opłacalne opcje:
          </h3>
          <ul className="space-y-2">
            {results.map((item, index) => (
              <li key={index} className="p-2 border rounded-lg bg-gray-100">
                🥃 {item.name} — {item.totalVolume} ml (
                {item.totalUnits.toFixed(2)} jednostek alkoholu)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BudgetCalculator;
