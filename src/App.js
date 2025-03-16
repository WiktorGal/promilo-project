import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import BudgetCalculator from "./components/BudgetCalculator";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/budget-calculator" element={<BudgetCalculator />} />
    </Routes>
  );
};

export default App;
