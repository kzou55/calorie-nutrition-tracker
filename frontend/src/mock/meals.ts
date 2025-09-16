import type { Meal } from "../types/meal";

export const mockMeal: Meal[] = [
  {
    id: 1,
    type: "Breakfast",
    date: "2025-09-16",
    mealFoodEntries: [
      {
        id: 101,
        foodItem: { id: 1, name: "Oatmeal", calories: 150, protein: 5},
        quantity: 1,
      },
      {
        id: 102,
        foodItem: { id: 2, name: "Banana", calories: 105, protein: 1},
        quantity: 1,
      },
    ],
  },
  {
    id: 2, 
    type: "Lunch",
    date: "2025-09-16",
    mealFoodEntries: [
      {
        id: 103,
        foodItem: { id: 3, name: "Spaghetti", calories: 600, protein: 53},
        quantity: 1,
      },
      {
        id: 104,
        foodItem: { id: 4, name: "Smoothie", calories: 105, protein: 1},
        quantity: 1,
      },
    ],
  },
];
