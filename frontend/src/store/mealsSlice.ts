import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Meal, MealFoodEntry, NewMealFoodEntry} from "../types/index";
import axios from "axios";

const API_URL = "http://localhost:8080/api/meals"; // adjust if backend runs elsewhere


// 🔹 Async thunks
export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
    const response = await axios.get<Meal[]>(API_URL);
    return response.data;
});

export const addFoodToMeal = createAsyncThunk("meals/addFoodToMeal", async ({ mealId, entry }: { mealId: number; entry: MealFoodEntry | NewMealFoodEntry}) => {
    const response = await axios.post(`${API_URL}/${mealId}/foods`, entry, { headers: { "Content-Type": "application/json" } });
    return response.data as Meal
});

/** 
export const addFoodToMealThunk = createAsyncThunk("meals/addFoodToMeal", async ({ mealId, entry }: { mealId: number; entry: MealFoodEntry }) => {
    // Step 1: fetch existing meal
    const mealRes = await axios.get<Meal>(`${API_URL}/${mealId}`);
    const updatedMeal = {
        ...mealRes.data,
        mealFoodEntries: [...mealRes.data.mealFoodEntries, entry],
    };

    // Step 2: save updated meal
    const res = await axios.post<Meal>(API_URL, updatedMeal);
    return res.data;
}
);
*/

// Delete food from a meal
export const removeFoodEntryFromMeal = createAsyncThunk("meals/removeFoodEntryFromMeal", async ({ mealId, entryId }: { mealId: number; entryId: number }) => {
    const response = await axios.delete(`${API_URL}/${mealId}/entries/${entryId}`);
    return response.data as Meal
}
);


// 🔹 Slice
interface MealsState {
    meals: Meal[];
    loading: boolean;
    error: string | null;
}

const initialState: MealsState = {
    meals: [],
    loading: false,
    error: null,
};

const mealsSlice = createSlice({
    name: "meals",
    initialState,
    reducers: {}, // ✅ empty since async handled in extraReducers
    extraReducers: (builder) => {
        builder.addCase(fetchMeals.fulfilled, (state, action) => {
            state.loading = false;
            state.meals = action.payload;
        })
        builder.addCase(addFoodToMeal.fulfilled, (state, action) => {
            const updatedMeal = action.payload;
            const idx = state.meals.findIndex((m) => m.id === updatedMeal.id);
            if (idx !== -1) {
                state.meals[idx] = updatedMeal;
            }
        });
        builder.addCase(removeFoodEntryFromMeal.fulfilled, (state, action) => {
            const updatedMeal = action.payload;
            const idx = state.meals.findIndex((m) => m.id === updatedMeal.id);
            if (idx !== -1) {
                state.meals[idx] = updatedMeal;
            }
        });
    },
});

export default mealsSlice.reducer

// Need to handle other states
/*
builder
  .addCase(fetchMeals.pending, (state) => { state.loading = true; })
  .addCase(fetchMeals.fulfilled, (state, action) => {
    state.loading = false;
    state.meals = action.payload;
  })
  .addCase(fetchMeals.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Failed to fetch meals";
  });
   */