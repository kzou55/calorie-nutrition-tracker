import { mockMeal } from "../data/meals";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MealFoodEntry } from "../types/mealFoodEntry";
import type { Meal } from "../types/meal";

const initialMeals = mockMeal;

const mealsSlice = createSlice({
    name: 'meals',
    initialState: initialMeals,
    reducers: {
        addFood(
            state: Meal[],
            action: PayloadAction<{ mealId: number; entry: MealFoodEntry }>) {
            const meal = state.find((m) => m.id === action.payload.mealId);
            if (meal) {
                meal.mealFoodEntries.push(action.payload.entry);
            }
        },
        deleteFood(
            state: Meal[],
            action: PayloadAction<{ mealID: number; entryID: number }>) {

            const meal = state.find(m => m.id === action.payload.mealID);
            if (meal) {
                meal.mealFoodEntries = meal.mealFoodEntries.filter(
                    entry => entry.id !== action.payload.entryID);
            }
        }
    }
});

export const { addFood, deleteFood } = mealsSlice.actions;
export default mealsSlice.reducer