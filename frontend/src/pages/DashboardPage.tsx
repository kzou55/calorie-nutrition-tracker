import type { JSX } from "react";
import NutritionSummary from "../components/dashboard/NutritionSummary";
import MealList from "../components/dashboard/MealList";
import { mockMeal } from "../data/meals";

const DashboardPage = (): JSX.Element => {
  return (
    <main className="flex flex-col">
      <h1>Dashboard</h1>
      <div className="flex justify-evenly">
        <NutritionSummary meals={mockMeal} />
        <MealList meals={mockMeal} />
      </div>
    </main>
  );
};

export default DashboardPage;

