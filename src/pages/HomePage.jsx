import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Dodajemy useNavigate
import "../assets/styles/style.css"; // Ścieżka do pliku CSS
import budgetImage from "../assets/images/budget.png"; // Ścieżka do obrazka
import alkometerImage from "../assets/images/alkometer.png"; // Ścieżka do obrazka

const HomePage = () => {
  const navigate = useNavigate(); // Hook do nawigacji

  const apps = [
    {
      name: "Budget Calculator",
      description:
        "Oblicz najbardziej opłacalny wybór alkoholu na podstawie budżetu.",
      link: "/budget-calculator",
      image: budgetImage, // Użyj zaimportowanego obrazu
    },
    {
      name: "Alkometer",
      description: "Sprawdź swój stan upojenia na podstawie BMI.",
      link: "/alkometer",
      image: alkometerImage,
    },
  ];

  // Funkcja do obsługi wylogowania (mock)
  const handleLogout = () => {
    // Tutaj mógłby być kod do faktycznego wylogowania
    navigate("/"); // Cofnij do strony logowania
  };

  return (
    <div className="min-h-screen relative">
      {/* Przycisk wylogowania w prawym górnym rogu */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm9 1h3v14h-3V4zm-2 14H4V4h6v14z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M9.707 7.293a1 1 0 00-1.414 1.414L9.586 10l-1.293 1.293a1 1 0 101.414 1.414L11 11.414l1.293 1.293a1 1 0 001.414-1.414L12.414 10l1.293-1.293a1 1 0 00-1.414-1.414L11 8.586 9.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        Wyloguj
      </button>

      {/* Osobna sekcja dla tytułu - pełna szerokość i wyśrodkowanie */}
      <div className="w-full text-center py-8">
        <h1 className="h1 inline-block">PROMILO</h1>
      </div>

      {/* Osobny kontener dla siatki aplikacji */}
      <div className="px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <Link
              to={app.link}
              key={index}
              className="transform hover:scale-105 transition-transform"
            >
              <div
                className="h-60 w-full bg-cover bg-center shadow-lg rounded-2xl p-4 text-center text-white flex items-center justify-center"
                style={{ backgroundImage: `url(${app.image})` }}
              >
                <div className="bg-black bg-opacity-30 rounded-lg p-4 w-full border border-white/50 hover:bg-opacity-40 transition-all">
                  <h2 className="text-2xl font-semibold">{app.name}</h2>
                  <p className="mt-2">{app.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
