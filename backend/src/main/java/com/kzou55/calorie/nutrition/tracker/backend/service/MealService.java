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

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MealService {

    private final MealRepository mealRepository;
    private final FoodItemRepository foodItemRepository;

    // Generic repo methods
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

    // Getting all meals for a specific user
    public List<Meal> getMealsForUser(Long userId) {
        return mealRepository.findByUserId(userId);
    }

    // Get meals for a user on a specific date
    public List<Meal> getMealsForUserOnDate(Long userId, LocalDate date) {
        return mealRepository.findByUserIdAndDate(userId, date);
    }

    // Adding food entry to a meal
    @Transactional
    public Meal addFoodToMeal(Long userId, Long mealId, MealFoodEntry entry) {

        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new EntityNotFoundException("Meal not found with id: " + mealId));

        if (!meal.getUser().getId().equals(userId)) {
            throw new SecurityException("Meal does not belong to this user");
        }

        FoodItem foodItem = entry.getFoodItem();

        if (foodItem.getId() != null) {
            // If food already exists, fetch it
            FoodItem existingFood = foodItemRepository.findById(foodItem.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Food item not found with id: " + foodItem.getId()));
            entry.setFoodItem(existingFood);
        } else {
            // Otherwise, create new food item
            FoodItem savedFood = foodItemRepository.save(foodItem);
            entry.setFoodItem(savedFood);
        }

        // Attach the entry to this meal
        entry.setMeal(meal);
        meal.getMealFoodEntries().add(entry);

        return mealRepository.save(meal); // ✅ return updated meal
    }

    // Deleting food from a meal
    @Transactional
    public Meal removeFoodFromMeal(Long userId, Long mealId, Long entryId) {
        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new EntityNotFoundException("Meal not found with id: " + mealId));

        if (!meal.getUser().getId().equals(userId)) {
            throw new SecurityException("Meal does not belong to this user");
        }

        boolean removed = meal.getMealFoodEntries().removeIf(entry -> entry.getId().equals(entryId));

        if (!removed) {
            throw new EntityNotFoundException("Food entry not found with id: " + entryId);
        }

        return mealRepository.save(meal);
    }



    // Not sure if needed since meals aren't created anymore
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
                    throw new EntityNotFoundException("FoodItem not found");
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
