import type { Meal, MealFoodEntry, NewMealFoodEntry } from "../../types/index.ts"
import api from "../../utils/api";

const getUserMeals = async (date: string) => {
    console.log(localStorage.getItem("token"));
    const response = await api.get<Meal[]>(`meals/date/${date}`);
    return response.data;
};


const createMeal = async (meal: { type: string; date: string }) => {
    const response = await api.post("meals", meal);
    return response.data as Meal;
};

const addMealFoodEntry = async (mealId: number, entry: MealFoodEntry | NewMealFoodEntry) => {
    const response = await api.post(`meals/${mealId}/entries`, entry);
    return response.data as Meal;
};

export const removeMealFoodEntry = async (mealId: number, entryId: number) => {
    const response = await api.delete(`meals/${mealId}/entries/${entryId}`);
    return response.data as Meal;
};

const MealService = { getUserMeals, createMeal, addMealFoodEntry, removeMealFoodEntry }

export default MealService;