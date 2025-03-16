import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Komunikat o błędzie/sukcesie
  const [isSuccess, setIsSuccess] = useState(false); // Czy logowanie było udane?
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.toLowerCase() === "alkoholek" && password === "piwosz") {
      setMessage("✅ Wchodzisz na bar! 🥂 Zapraszamy!");
      setIsSuccess(true);
      setTimeout(() => navigate("/home"), 1000); // Przekierowanie po 1s
    } else {
      setMessage("❌ Złe dane kierowniku! Spróbuj jeszcze raz. 🍺");
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center w-full max-w-sm transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-5xl font-bold text-yellow-600 mb-6">
          🍹 LOGOWANIE PROMILO 🎯
        </h1>

        {message && (
          <div
            className={`p-3 rounded-lg mb-4 text-white ${
              isSuccess ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="👤 Podaj swój promilowy nick"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-yellow-500 rounded-lg p-3 w-full text-center text-yellow-800 placeholder-yellow-600"
          />
          <input
            type="password"
            placeholder="🔒 Podaj hasło do kufla"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-yellow-500 rounded-lg p-3 w-full text-center text-yellow-800 placeholder-yellow-600"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white font-bold p-3 rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-110"
          >
            🍺 Wbij na browara!
          </button>
        </form>

        <p className="mt-4 text-sm text-yellow-700">
          🔎 Podpowiedź: <b>alkoholek / piwosz</b>
        </p>

        <div className="mt-6 text-xs text-yellow-700 italic">
          „Pamiętaj: Wódka to jak CTRL+S — ratuje przed zapomnieniem!” 🍸😎
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
