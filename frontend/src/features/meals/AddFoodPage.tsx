import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addFoodToMeal } from "./mealSlice";
import { useAppDispatch } from "../../app/hooks";
import type { NewMealFoodEntry, Meal } from "../../types/index";
import type { RootState } from "../../app/store";

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"];

const AddFoodPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentDate } = location.state as { currentDate: string };

  const meals = useSelector((state: RootState) => state.meals.meals);

  const [mealType, setMealType] = useState(MEAL_TYPES[0]);
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const existingMeal = meals.find((m: Meal) => m.type === mealType);
    const mealId = existingMeal?.id;

    const newEntry: NewMealFoodEntry = {
      quantity: 1,
      foodItem: { name: foodName, calories, protein },
    };

    try {
      await dispatch(addFoodToMeal({ mealId, entry: newEntry, mealType, date: currentDate })).unwrap();
      navigate("/add-meal"); // back to main page
    } catch (err) {
      console.error("Failed to add food:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Add Food ({currentDate})</h2>

      <label className="flex flex-col">
        Meal Type:
        <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="border p-2 rounded">
          {MEAL_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col">
        Food Name:
        <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} className="border p-2 rounded" required />
      </label>

      <label className="flex flex-col">
        Calories:
        <input type="number" value={calories} onChange={(e) => setCalories(Number(e.target.value))} className="border p-2 rounded" required />
      </label>

      <label className="flex flex-col">
        Protein:
        <input type="number" value={protein} onChange={(e) => setProtein(Number(e.target.value))} className="border p-2 rounded" required />
      </label>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save
      </button>
    </form>
  );
};

export default AddFoodPage;
