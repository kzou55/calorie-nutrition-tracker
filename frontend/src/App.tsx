import './App.css'
import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AddMealPage from "./pages/AddMealPage";
import AddFoodPage from "./pages/AddFoodPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from './components/layout/Layout';
import './index.css';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/add-meal" element={<AddMealPage />}>
            <Route path="add-food" element={<AddFoodPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App
