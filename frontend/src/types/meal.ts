import type { MealFoodEntry } from "./mealFoodEntry";

export type Meal = {
  id: number;
  type: "Breakfast" | "Lunch" | "Dinner";     
  date: string;      // In ISO format (ex. "2025-09-13")
  mealFoodEntries: MealFoodEntry[];
};
