import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Alcometer() {
  const [weight, setWeight] = useState('');
  const [drinks, setDrinks] = useState([{ volume: '', percent: '' }]);
  const [hours, setHours] = useState('1');
  const [result, setResult] = useState(null);

  const handleDrinkChange = (index, field, value) => {
    const updated = [...drinks];
    updated[index][field] = value;
    setDrinks(updated);
  };

  const addDrink = () => setDrinks([...drinks, { volume: '', percent: '' }]);

  const calculateBAC = () => {
    const m = parseFloat(weight);
    if (isNaN(m) || m <= 0) {
      alert('Podaj poprawną wagę!');
      return;
    }
    if (!drinks.some(d => parseFloat(d.volume) > 0 && parseFloat(d.percent) > 0)) {
      alert('Dodaj przynajmniej jeden napój z prawidłowymi wartościami!');
      return;
    }

    const totalAlcoholGrams = drinks.reduce((sum, drink) => {
      const v_ml = parseFloat(drink.volume);
      const p_percent = parseFloat(drink.percent);
      if (isNaN(v_ml) || isNaN(p_percent) || v_ml <= 0 || p_percent <= 0) return sum;
      return sum + v_ml * (p_percent / 100) * 0.789;
    }, 0);

    const r = 0.68;
    const beta = 0.15;
    const rawBAC = totalAlcoholGrams / (r * m);
    const metabolized = beta * parseFloat(hours);
    const bac = Math.max(0, rawBAC - metabolized);
    setResult(bac.toFixed(3));
  };

  return (
    <div>
        <Link
          to="/home"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full shadow absolute top-4 left-4 z-10"
        >
          ← Powrót
        </Link>
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0" />

      <div className="relative w-full max-w-sm">
    

        <div className="bg-white shadow-2xl rounded-3xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-bold text-yellow-500 mb-6">🍻 Kalkulator promili</h2>

          <form onSubmit={e => { e.preventDefault(); calculateBAC(); }} className="flex flex-col gap-4 text-left">
            <div>
              <label className="block mb-1 text-gray-600 text-sm">Waga (kg)</label>
              <input
                type="number"
                placeholder="np. 70"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full text-center focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600 text-sm">Czas picia (h)</label>
              <input
                type="number"
                step="0.1"
                placeholder="np. 2"
                value={hours}
                onChange={e => setHours(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full text-center focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>

            {drinks.map((drink, idx) => (
              <div key={idx} className="flex space-x-2">
                <div className="flex-1">
                  <label className="block mb-1 text-gray-600 text-sm">Objętość (ml)</label>
                  <input
                    type="number"
                    placeholder="ml"
                    value={drink.volume}
                    onChange={e => handleDrinkChange(idx, 'volume', e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 w-full text-center focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  />
                </div>
                <div className="w-20">
                  <label className="block mb-1 text-gray-600 text-sm">% Alk.</label>
                  <input
                    type="number"
                    placeholder="%"
                    value={drink.percent}
                    onChange={e => handleDrinkChange(idx, 'percent', e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 w-full text-center focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}

            <button type="button" onClick={addDrink} className="text-blue-600 hover:underline self-start mt-2">+ Dodaj napój</button>

            <button type="submit" className="bg-yellow-500 text-white font-bold p-3 rounded-lg hover:bg-yellow-600 transition-colors mt-4">
              🍹 Oblicz
            </button>
          </form>

          {result !== null && (
            <p className="mt-6 text-gray-800 text-lg">Twoje stężenie alkoholu: <strong>{result} ‰</strong></p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
