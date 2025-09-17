import type { MealFoodEntry } from "./mealFoodEntry";
import type { FoodItem } from "./foodItem";

export type Meal = {
  id: number;
  type: "Breakfast" | "Lunch" | "Dinner";     
  date: string;      // In ISO format (ex. "2025-09-13")
  mealFoodEntries: MealFoodEntry[];
};


export interface MealFoodEntry {
  id: number;
  quantity: number;
  foodItem: FoodItem;
}

// What frontend sends when creating
export interface NewMealFoodEntry {
  quantity: number;
  foodItem: {
    id?: number; // optional if new
    name: string;
    calories: number;
    protein: number;
  };
}

export type FoodItem = {
  id: number;
  name: string;
  calories: number;
  protein: number;
};
