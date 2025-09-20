import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "../features/meals/mealSlice";
import authReducer from "../features/auth/authSlice"


export const store = configureStore({
    reducer: {
        meals: mealsReducer,
        auth: authReducer
    },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
