import axios from "axios";
import type { Meal, MealFoodEntry, NewMealFoodEntry } from "../../types/index.ts"

const API_URL = "http://localhost:8080/api/meals";

const getUserMeals = async (token: string) => {
    const response = await axios.get<Meal[]>(
        API_URL,
        { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}


const addMealFoodEntry = async (mealId: number, entry: MealFoodEntry | NewMealFoodEntry, token: string) => {
    const response = await axios.post(`${API_URL}/${mealId}/entries`, entry, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data as Meal;
};

export const removeMealFoodEntry = async (mealId: number, entryId: number, token: string) => {
    const res = await axios.delete(`${API_URL}/${mealId}/entries/${entryId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data as Meal;
};

const MealService = {getUserMeals, addMealFoodEntry, removeMealFoodEntry}

export default MealService;