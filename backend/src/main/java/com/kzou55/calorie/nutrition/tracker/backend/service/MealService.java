package com.kzou55.calorie.nutrition.tracker.backend.service;

import com.kzou55.calorie.nutrition.tracker.backend.model.Meal;
import com.kzou55.calorie.nutrition.tracker.backend.model.FoodItem;
import com.kzou55.calorie.nutrition.tracker.backend.model.MealFoodEntry;
import com.kzou55.calorie.nutrition.tracker.backend.repository.MealRepository;
import com.kzou55.calorie.nutrition.tracker.backend.repository.FoodItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MealService {

    private final MealRepository mealRepository;
    private final FoodItemRepository foodItemRepository;


    public Meal createMealWithFoodEntries(Meal newMeal) {
        for (MealFoodEntry entry : newMeal.getMealFoodEntries()) {
            entry.setMeal(newMeal);

            FoodItem food = entry.getFoodItem();

            Optional<FoodItem> existing = foodItemRepository.findByName(food.getName());
            if (existing.isPresent()) {
                entry.setFoodItem(existing.get());
            } else {
                entry.setFoodItem(foodItemRepository.save(food));
            }
        }

        return mealRepository.save(newMeal);
    }
}
