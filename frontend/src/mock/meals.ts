import type { Meal } from "../types/meal"

export const mockMeal: Meal[] = [{
    id: 1,
    type: "Lunch",
    date: "2025-09-11",
    mealFoodEntries: [
        {
            id: 1,
            quantity: 2,
            foodItem: {
                id: 1,
                name: "chicken",
                calories: 5,
                protein: 1
            }
        },
        {
            id: 2,
            quantity: 2,
            foodItem: {
                id: 1,
                name: "chicken",
                calories: 5,
                protein: 1
            }
        }
    ]
}]