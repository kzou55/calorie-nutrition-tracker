import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { MEAL_TYPES } from "../../constants/mealTypes";
import type { RootState, AppDispatch } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { fetchMeals, removeFoodEntryFromMeal } from "./mealSlice";
import type { MealFoodEntry } from "../../types/index";

const AddMealPage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const meals = useSelector((state: RootState) => state.meals.meals);
  const loading = useSelector((state: RootState) => state.meals.loading);
  const error = useSelector((state: RootState) => state.meals.error);

  // 🔹 Date state
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    dispatch(fetchMeals(currentDate)); // fetch meals for current date
  }, [dispatch, currentDate]);

  const handleDelete = (mealId: number, entryId: number) => {
    dispatch(removeFoodEntryFromMeal({ mealId, entryId }));
  };

  // 🔹 Navigate to previous day
  const goPreviousDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev.toISOString().split("T")[0]);
  };

  // 🔹 Navigate to next day (cannot go beyond today)
  const goNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    const today = new Date();
    if (next <= today) {
      setCurrentDate(next.toISOString().split("T")[0]);
    }
  };

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <main className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Add a Meal ({currentDate})</h1>

      {/* 🔹 Previous / Next day navigation */}
      <div className="flex gap-2 mb-4">
        <button onClick={goPreviousDay}>← Previous Day</button>
        <span>{currentDate}</span>
        <button onClick={goNextDay}>Next Day →</button>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="border border-gray-300 px-4 py-2">Food</th>
            <th className="border border-gray-300 px-4 py-2">Calories (kcal)</th>
            <th className="border border-gray-300 px-4 py-2">Protein (g)</th>
            <th className="border border-gray-300 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {MEAL_TYPES.map((type) => {
            const meal = meals.find((m) => m.type === type);

            return (
              <React.Fragment key={type}>
                <tr className="border border-gray-300 bg-gray-100">
                  <td className="border border-gray-300 font-bold" colSpan={4}>
                    {type}
                  </td>
                </tr>

                {(meal?.mealFoodEntries.length ?? 0) > 0 ? (
                  meal!.mealFoodEntries.map((entry: MealFoodEntry) => (
                    <tr key={entry.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {entry.foodItem.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {entry.foodItem.calories}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {entry.foodItem.protein}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(meal!.id, entry.id!)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="border border-gray-300 italic text-gray-500 px-4 py-2"
                      colSpan={4}
                    >
                      {meal ? "No items yet" : "Add food to create this meal"}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {/* Pass currentDate via state to AddFoodPage */}
      <Link
        to="add-food"
        state={{ currentDate }}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4 self-start"
      >
        Add Food
      </Link>

      <Outlet />
    </main>
  );
};

export default AddMealPage;
