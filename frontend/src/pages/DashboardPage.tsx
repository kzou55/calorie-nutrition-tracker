import type { JSX } from "react";
import NutritionSummary from "../components/dashboard/NutritionSummary";
import { mockMeal } from "../data/meals";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const DashboardPage = (): JSX.Element => {
  const meals = useSelector((state: RootState) => state.meals);

  const totals = meals.reduce(
    (acc, meal) => {
      meal.mealFoodEntries.forEach((entry) => {
        acc.calories += entry.foodItem.calories;
        acc.protein += entry.foodItem.protein;
      });
      return acc;
    },
    {calories: 0, protein: 0}
  );


  return (
    <main className="flex-col">
      <h1>Dashboard</h1>
      <div className="flex justify-evenly border-solid">
        <h2>
          Summary for Today
          <div>
            <p>Total Calories: {totals.calories}</p>
            <p>Total Protein: {totals.protein}</p>
          </div>
        </h2>
      </div>
    </main>
  );
};

export default DashboardPage;



// Add total calories for today
// Add Total Nutritions