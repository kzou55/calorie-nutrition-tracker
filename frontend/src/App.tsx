import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import DashboardPage from "./features/meals/DashboardPage";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from './features/auth/RegisterPage';
import AddMealPage from "./features/meals/AddMealPage";
import AddFoodPage from "./features/meals/AddFoodPage";
import NotFoundPage from "./features/auth/NotFoundPage";
import Layout from './components/layout/Layout';
import './index.css';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
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
