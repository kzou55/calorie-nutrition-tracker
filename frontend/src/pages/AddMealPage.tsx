import { useSelector, useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { MEAL_TYPES } from "../constants/mealTypes";
import React from "react";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../store/store";
import type { Meal, MealFoodEntry } from "../types/index";
import { fetchMeals, removeFoodEntryFromMeal } from "../store/mealsSlice";



const AddMealPage = () => {
    const meals = useSelector((state: RootState) => state.meals.meals);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchMeals());
    }, [dispatch]);


    const handleDelete = (mealId: number, entryId: number) => {
        dispatch(removeFoodEntryFromMeal({ mealId, entryId }));
    };
    return (
        <main className="flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-4">Add a Meal</h1>

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
                        const meal = meals.find((m: Meal) => m.type === type);
                        console.log("Meals from backend:", meals);


                        return (
                            <React.Fragment key={type}>
                                {/* Meal header row */}
                                <tr className="border border-gray-300 bg-gray-100">
                                    <td className="border border-gray-300 font-bold" colSpan={4}>
                                        {type}
                                    </td>
                                </tr>

                                {meal ? (
                                    meal.mealFoodEntries.length > 0 ? (
                                        meal.mealFoodEntries.map((entry: MealFoodEntry) => (
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
                                                        onClick={() =>
                                                            handleDelete(meal.id, entry.id!)
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
                                                className="border border-gray-300 italic text-gray-500 px-4 py-2"
                                                colSpan={4}
                                            >
                                                No items yet
                                            </td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            className="border border-gray-300 italic text-gray-500 px-4 py-2"
                                            colSpan={4}
                                        >
                                            Meal not created yet
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>

            <Link
                to="add-food"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4 self-start"
            >
                Add Food
            </Link>

            <Outlet />
        </main>
    );
};

export default AddMealPage;