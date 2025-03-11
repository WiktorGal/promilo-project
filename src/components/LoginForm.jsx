import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      console.log("✅ Logowanie powiodło się! Przechodzę na Dashboard");
      navigate("/dashboard");
    } else {
      setError("❌ Niepoprawna nazwa użytkownika lub hasło.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-200">
      <div className="bg-white p-8 rounded-xl shadow-xl w-80">
        <h1 className="text-2xl font-bold text-center mb-4">Logowanie</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
