import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFoodToMeal } from "../store/mealsSlice";


import type { AppDispatch } from "../store/store";
import type {} from "../types/index";
import type { MealFoodEntry, NewMealFoodEntry } from "../types/index";
import type { RootState } from "../store/store";

const AddFoodPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const meals = useSelector((state: RootState) => state.meals.meals);
  const loading = useSelector((state: RootState) => state.meals.loading);
  const error = useSelector((state: RootState) => state.meals.error);

  const navigate = useNavigate();

  // local state for inputs
  const [mealId, setMealId] = useState(meals[0]?.id ?? 1);
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct payload in the shape backend expects
    const newEntry : NewMealFoodEntry = {
      quantity: 1,
      foodItem: {
        name: foodName,
        calories,
        protein,
      },
    };

     dispatch(addFoodToMeal({ mealId, entry: newEntry }))
      .unwrap() //  lets us catch errors easily
      .then(() => {
        navigate("/add-meal"); // go back once successful
      })
      .catch((err) => {
        console.error("Failed to add food:", err);
      });

  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Add Food</h2>

      {/* Meal selector */}
      <label className="flex flex-col">
        Meal Type:
        <select
          value={mealId}
          onChange={(e) => setMealId(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {meals.map((meal) => (
            <option key={meal.id} value={meal.id}>
              {meal.type}
            </option>
          ))}
        </select>
      </label>

      {/* Food name */}
      <label className="flex flex-col">
        Food Name:
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          className="border p-2 rounded"
          required
        />
      </label>

      {/* Calories */}
      <label className="flex flex-col">
        Calories:
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(Number(e.target.value))}
          className="border p-2 rounded"
          required
        />
      </label>

      {/* Protein */}
      <label className="flex flex-col">
        Protein:
        <input
          type="number"
          value={protein}
          onChange={(e) => setProtein(Number(e.target.value))}
          className="border p-2 rounded"
          required
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
};

export default AddFoodPage;
