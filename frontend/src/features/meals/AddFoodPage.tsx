import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addFoodToMeal } from "./mealSlice";
import { useAppDispatch } from "../../app/hooks";
import type { NewMealFoodEntry, Meal, FoodItem } from "../../types/index";
import type { RootState } from "../../app/store";
import api from "../../utils/api";

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"];
const FOOD_SOURCES = ["Custom", "Nutritionix"];

interface SearchFoodFormProps {
  mealType: string;
  currentDate: string;
  onAddFood: (foodItem: { name: string; calories: number; protein: number }) => void;
}


const AddFoodPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentDate } = location.state as { currentDate: string };

  const meals = useSelector((state: RootState) => state.meals.meals);

  const [mealType, setMealType] = useState(MEAL_TYPES[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [foodMode, setFoodMode] = useState<"custom" | "search">("custom");
  const [selectedFood, setSelectedFood] = useState<any>(null);


  // for handling search food 
  const [query, setQuery] = useState("");        // search input
  const [results, setResults] = useState<any[]>([]); // Nutritionix search results
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    if (foodMode === "search" && !selectedFood) {
      alert("Please select a food item before saving!");
      return;
    }

    if (foodMode === "custom" && !foodName.trim()) {
      alert("Please enter a food name before saving!");
      return;
    }

    const existingMeal = meals.find((m: Meal) => m.type === mealType);
    const mealId = existingMeal?.id;

    const newEntry: NewMealFoodEntry = {
      quantity: quantity,
      foodItem: { name: foodName, calories, protein },
    };

    console.log(newEntry);

    try {
      await dispatch(addFoodToMeal({ mealId, entry: newEntry, mealType, date: currentDate })).unwrap();
      navigate("/add-meal"); // back to main page
    } catch (err) {
      console.error("Failed to add food:", err);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query) return;

    setLoading(true);
    try {
      const response = await api.get(`fooditems/test-search?query=${query}`);
      setResults(response.data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSelect = (item: any) => {
    setFoodName(item.food_name);
    setCalories(item.nf_calories ?? 0);
    setProtein(item.nf_protein ?? 0);
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () =>
    setQuantity((q) => (q > 1 ? q - 1 : 1)); // don't allow < 1


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Add Food ({currentDate})</h2>
      <div className="flex gap-2">
        <button type="button" onClick={() => setFoodMode("custom")}
          className={foodMode === "custom" ? "bg-blue-600 text-white" : "bg-gray-200"}>
          Custom Food
        </button>
        <button type="button" onClick={() => setFoodMode("search")}
          className={foodMode === "search" ? "bg-blue-600 text-white" : "bg-gray-200"}>
          Search Food
        </button>
      </div>

      <label className="flex flex-col">
        Meal Type:
        <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="border p-2 rounded">
          {MEAL_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>

      {/* Quantity selector */}
      <label className="flex items-center gap-2">
        Quantity:
        <button
          type="button"
          onClick={decrementQuantity}
          className="px-2 py-1 bg-gray-300 rounded"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 w-16 text-center rounded"
        />
        <button
          type="button"
          onClick={incrementQuantity}
          className="px-2 py-1 bg-gray-300 rounded"
        >
          +
        </button>
      </label>
      {foodMode === "custom" && (
        <div>
          {/* Existing custom food inputs: name, calories, protein, etc. */}

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
        </div>
      )}

      {foodMode === "search" && (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search food..."
            className="border p-2 rounded"
          />
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSearch}
          >
            Search
          </button>

          {loading && <p>Loading...</p>}

          <ul className="mt-2">
            {results.map((item, index) => {
              const isSelected = selectedFood?.name === item.name;

              return (
                <li
                  className={`border p-2 my-1 flex justify-between cursor-pointer
    ${isSelected ? "bg-blue-600 text-white !important" : "bg-white text-black"}
    hover:bg-blue-100`}
                  onClick={() => {
                    console.log("bbefore", isSelected);
                    if (isSelected) {
                      // Deselect if clicked again
                      setSelectedFood(null);
                      setFoodName("");
                      setCalories(0);
                      setProtein(0);
                    } else {
                      // Select new item
                      setSelectedFood(item);
                      setFoodName(item.name);
                      setCalories(item.calories ?? 0);
                      setProtein(item.protein ?? 0);
                    }
                  }}
                >
                  <div className="flex flex-col">
                    <span className="font-bold">{item.name}</span>
                    <span className="text-sm text-gray-600">
                      Calories: {item.calories}, Protein: {item.protein}g
                    </span>
                  </div>
                </li>

              );


            })}

          </ul>
        </div>

      )}

      <button type="submit"
        disabled={
          (foodMode === "search" && !selectedFood) ||
          (foodMode === "custom" && !foodName.trim())
        }
        className={`px-4 py-2 rounded text-white ${(foodMode === "search" && !selectedFood) ||
            (foodMode === "custom" && !foodName.trim())
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        Save
      </button>
    </form>
  );
};

export default AddFoodPage;
