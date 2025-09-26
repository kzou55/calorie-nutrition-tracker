import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Meal, NewMealFoodEntry } from "../../types/index";
import mealService from "./mealService";
import type { RootState } from "../../app/store";


// 🔹 Async thunks
export const fetchMeals = createAsyncThunk<Meal[], string, { state: RootState }>("meals/fetchMeals", async (date) => {
    return await mealService.getUserMeals(date);
}
);

export const addFoodToMeal = createAsyncThunk<Meal, { mealId?: number; entry: NewMealFoodEntry; mealType: string; date: string }, { state: RootState }>(
    "meals/addFood",
    async ({ mealId, entry, mealType, date }: { mealId?: number; entry: NewMealFoodEntry; mealType: string; date: string }, thunkAPI) => {

        const token = thunkAPI.getState().auth.token;
        if (!token) throw new Error("No auth token");

        try {
            let id = mealId;

            // If mealId not provided, create the meal first
            if (!mealId) {
                const meal = await mealService.createMeal({ type: mealType, date });
                id = meal.id;
            }

            // Add the food entry to the meal
            return await mealService.addMealFoodEntry(id!, entry);
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || "Failed to add food entry");
        }
    }
);

export const removeFoodEntryFromMeal = createAsyncThunk<Meal, { mealId: number; entryId: number }, { state: RootState }>(
    "meals/removeFoodEntryFromMeal", async ({ mealId, entryId }) => {
        return await mealService.removeMealFoodEntry(mealId, entryId);
    });


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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMeals.fulfilled, (state, action) => {
                state.loading = false;
                state.meals = action.payload;
            })
            .addCase(fetchMeals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch meals";
            })
            .addCase(addFoodToMeal.fulfilled, (state, action) => {
                const updatedMeal = action.payload;
                const idx = state.meals.findIndex((m) => m.id === updatedMeal.id);
                if (idx !== -1) state.meals[idx] = updatedMeal;
                else state.meals.push(updatedMeal); // Add new meal dynamically
            })
            .addCase(removeFoodEntryFromMeal.fulfilled, (state, action) => {
                const updatedMeal = action.payload;
                const idx = state.meals.findIndex((m) => m.id === updatedMeal.id);
                if (idx !== -1) state.meals[idx] = updatedMeal;
            });
    },
});

export default mealsSlice.reducer