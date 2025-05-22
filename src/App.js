import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import BudgetCalculator from "./pages/BudgetCalculator";
import Alcometer from "./pages/Alcometer";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/budget-calculator" element={<BudgetCalculator />} />
        <Route path="/alkometer" element={<Alcometer />} />
      </Routes>
    </div>
  );
};

export default App;
