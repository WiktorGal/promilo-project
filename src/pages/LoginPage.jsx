import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      navigate("/home"); // Przekierowanie po poprawnym logowaniu
    } else {
      alert("❌ Nieprawidłowe dane logowania! Spróbuj jeszcze raz.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-sm text-center transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-bold text-yellow-500 mb-6">
          🍹 Promilo Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="👤 Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full text-center focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="🔒 Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full text-center focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white font-bold p-3 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            🔥 Zaloguj się
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          👀 Podpowiedź: <b>admin / password</b>
        </p>

        <div className="mt-6 text-xs text-gray-400 italic">
          „Nie pijesz — nie żyjesz. Pijesz — żyjesz dwa razy!” 🍻
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
