import './App.css'
import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AddMealPage from "./pages/AddMealPage";
import AddFoodPage from "./pages/AddFoodPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/layout/NavBar";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/add-meal" element={<AddMealPage />} />
        <Route path="/add-food" element={<AddFoodPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App
