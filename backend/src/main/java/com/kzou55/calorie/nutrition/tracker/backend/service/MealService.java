package com.kzou55.calorie.nutrition.tracker.backend.service;

import com.kzou55.calorie.nutrition.tracker.backend.model.Meal;
import com.kzou55.calorie.nutrition.tracker.backend.model.FoodItem;
import com.kzou55.calorie.nutrition.tracker.backend.model.MealFoodEntry;
import com.kzou55.calorie.nutrition.tracker.backend.repository.MealRepository;
import com.kzou55.calorie.nutrition.tracker.backend.repository.FoodItemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MealService {

    private final MealRepository mealRepository;
    private final FoodItemRepository foodItemRepository;

    public List<Meal> getMeals() {
        return mealRepository.findAll();
    }

    public Optional<Meal> findMealById(Long requestedId) {
        return mealRepository.findById(requestedId);
    }

    public boolean existsById(Long id) {
        return mealRepository.existsById(id);
    }

    public void deleteById(Long id) {
        mealRepository.deleteById(id);
    }

    @Transactional
    public Meal createMeal(Meal meal) {
        for (MealFoodEntry entry : meal.getMealFoodEntries()) {
            FoodItem fi = entry.getFoodItem();
            if (fi.getId() != null) {
                // Existing FoodItem, fetch managed entity
                Optional<FoodItem> possibleFood = foodItemRepository.findById(fi.getId());
                if (possibleFood.isPresent()){
                    FoodItem existingFood = possibleFood.get();
                    entry.setFoodItem(existingFood);
                }
                else {
                    throw new EntityNotFoundException("FoodItem nnot found");
                }
            }
            else {
                // New FoodItem, save it first
                FoodItem saved = foodItemRepository.save(fi);
                entry.setFoodItem(saved);
            }
            entry.setMeal(meal);
        }
        // Save meal with updated mealFoodEntries
        return mealRepository.save(meal);
    }
}
