import React from "react";
import { Link } from "react-router-dom";
import BudgetCalculator from "./BudgetCalculator";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-200">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Panel Menela</h1>
        <BudgetCalculator />

        <Link
          to="/"
          className="block mt-6 text-blue-500 hover:underline text-center"
        >
          Wyloguj się
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
