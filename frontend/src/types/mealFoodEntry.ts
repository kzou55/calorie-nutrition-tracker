import type { FoodItem } from "./foodItem";
import type { Meal } from "./meal";

export type MealFoodEntry = {
  id: number;
  quantity: number;
  foodItem: FoodItem;
};