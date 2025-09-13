import type { MealFoodEntry } from "./mealFoodEntry";

export type Meal = {
  id: number;
  type: string;      // ex. "Lunch"
  date: string;      // In ISO format (ex. "2025-09-13")
  mealFoodEntries: MealFoodEntry[];
};
