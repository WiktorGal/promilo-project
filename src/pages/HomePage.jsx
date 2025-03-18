import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/style.css"; // Ścieżka do pliku CSS

const HomePage = () => {
  const apps = [
    {
      name: "Budget Calculator",
      description:
        "Oblicz najbardziej opłacalny wybór alkoholu na podstawie budżetu.",
      link: "/budget-calculator",
      image: "/assets/images/budget.png",
    },
    {
      name: "Alkometer",
      description: "Sprawdź swój stan upojenia na podstawie BMI.",
      link: "/alkometer",
      image: "/assets/images/alkometer.png",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Kontener dla napisu z animacją */}
      <div className="container">
        <h1 className="h1">PROMILO</h1>
      </div>

      {/* Kontener aplikacji, z odpowiednim marginesem */}
      <div className="grid-container">
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
