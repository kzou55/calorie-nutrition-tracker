import type { FoodItem } from "./foodItem";

export type MealFoodEntry = {
  id: number;
  quantity: number;
  foodItem: FoodItem;
};
