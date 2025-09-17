import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { deleteFood } from "../store/mealsSlice";
import type { Meal } from "../types/meal";
import type { MealFoodEntry } from "../types/mealFoodEntry";
import { Outlet, Link } from "react-router-dom";
import { MEAL_TYPES } from "../constants/mealTypes";
import React from "react";



const AddMealPage = () => {
    const meals = useSelector((state: RootState) => state.meals);
    const dispatch = useDispatch();

    return (
        <main className="flex flex-col">
            <h1>Add a Meal</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-700 text-white">
                        <th className="border border-gray-300 px-4 py-2">Meal</th>
                        <th className="border border-gray-300 px-4 py-2">Calories kcal</th>
                        <th className="border border-gray-300 px-4 py-2">Protein g</th>
                        <th className="border border-gray-300 px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {MEAL_TYPES.map((type) => {
                        const meal = meals.find((m: Meal) => m.type === type);

                        return (
                            <React.Fragment key={type}>
                                <tr className="border border-gray-300 bg-gray-100">
                                    <td className="border border-gray-300 font-bold" colSpan={4}>
                                        {type}
                                    </td>
                                </tr>

                                {meal ? (
                                    meal.mealFoodEntries.map((entry: MealFoodEntry) => (
                                        <tr key={entry.id}>
                                            <td className="border border-gray-300">{entry.foodItem.name}</td>
                                            <td className="border border-gray-300">{entry.foodItem.calories}</td>
                                            <td className="border border-gray-300">{entry.foodItem.protein}</td>
                                            <td className="border border-gray-300">
                                                <button
                                                    className="text-red-600 hover:underline"
                                                    onClick={() =>
                                                        dispatch(deleteFood({ mealID: meal.id, entryID: entry.id }))
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            className="border border-gray-300 italic text-gray-500"
                                            colSpan={4}
                                        >
                                            No items yet
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>

            <Link to="add-food" className="btn mt-4">
                Add Food
            </Link>
            <Outlet />
        </main>
    );
};
export default AddMealPage;
