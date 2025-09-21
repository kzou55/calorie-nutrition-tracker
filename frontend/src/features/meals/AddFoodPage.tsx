import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFoodToMeal } from "./mealSlice";
import { useAppDispatch } from "../../app/hooks";
import type { NewMealFoodEntry } from "../../types/index";
import type { RootState } from "../../app/store";

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"];

const AddFoodPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const meals = useSelector((state: RootState) => state.meals.meals);
  const loading = useSelector((state: RootState) => state.meals.loading);
  const error = useSelector((state: RootState) => state.meals.error);

  const [mealType, setMealType] = useState(MEAL_TYPES[0]);
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if a meal of this type exists
    const existingMeal = meals.find((m) => m.type === mealType);
    const mealId = existingMeal?.id;

    const newEntry: NewMealFoodEntry = {
      quantity: 1,
      foodItem: {
        name: foodName,
        calories,
        protein,
      },
    };

    try {
      await dispatch(
        addFoodToMeal({
          mealId,
          entry: newEntry,
          mealType,
          date: new Date().toISOString().split("T")[0], // send YYYY-MM-DD
        })
      ).unwrap();

      navigate("/add-meal"); // go back to main meal page
    } catch (err) {
      console.error("Failed to add food:", err);
    }
  };

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Add Food</h2>

      <label className="flex flex-col">
        Meal Type:
        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="border p-2 rounded"
        >
          {MEAL_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

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
