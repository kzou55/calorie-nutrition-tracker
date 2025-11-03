package com.kzou55.calorie.nutrition.tracker.backend.service;

import com.kzou55.calorie.nutrition.tracker.backend.model.*;
import com.kzou55.calorie.nutrition.tracker.backend.repository.MealFoodEntryRepository;
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
    private final NutritionService nutritionService;
    private final MealFoodEntryRepository mealFoodEntryRepository;

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
            // Food already exists in DB
            FoodItem existingFood = foodItemRepository.findById(foodItem.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Food item not found with id: " + foodItem.getId()));
            entry.setFoodItem(existingFood);
        } else if (foodItem.getSource() == FoodSource.User) {
            // Custom/user-added food: check if this user already has this food
            FoodItem savedFood = foodItemRepository
                    .findByNameAndUser(foodItem.getName(), meal.getUser())
                    .orElseGet(() -> {
                        foodItem.setUser(meal.getUser());
                        foodItem.setSource(FoodSource.User);
                        return foodItemRepository.save(foodItem);
                    });
            entry.setFoodItem(savedFood);
        } else {
            // Nutritionix food: avoid duplicates by name + source
            FoodItem savedFood = foodItemRepository
                    .findByNameAndSource(foodItem.getName(), FoodSource.NUTRITIONIX)
                    .orElseGet(() -> {
                        foodItem.setSource(FoodSource.NUTRITIONIX);
                        return foodItemRepository.save(foodItem);
                    });
            entry.setFoodItem(savedFood);
        }

        // Attach entry to meal
        entry.setMeal(meal);
        meal.getMealFoodEntries().add(entry);

        return mealRepository.save(meal);
    }

    @Transactional
    public Meal removeFoodFromMeal(Long userId, Long mealId, Long entryId) {
        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new EntityNotFoundException("Meal not found with id: " + mealId));

        if (!meal.getUser().getId().equals(userId)) {
            throw new SecurityException("Meal does not belong to this user");
        }

        // Find the MealFoodEntry to remove
        MealFoodEntry entryToRemove = meal.getMealFoodEntries().stream()
                .filter(entry -> entry.getId().equals(entryId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Food entry not found with id: " + entryId));

        FoodItem foodItem = entryToRemove.getFoodItem();

        // Remove the entry from the meal
        meal.getMealFoodEntries().remove(entryToRemove);
        mealFoodEntryRepository.delete(entryToRemove); // optional if you have the repository

        // If it's a user-added food and no other meal entries reference it, delete the food
        if (foodItem.getSource() == FoodSource.User) {
            boolean isStillUsed = mealFoodEntryRepository.existsByFoodItem(foodItem);
            if (!isStillUsed) {
                foodItemRepository.delete(foodItem);
            }
        }

        return mealRepository.save(meal);
    }


    @Transactional
    public Meal createMeal(User user, Meal meal) {

        // Check if a meal of this type already exists for the user on this date
        Optional<Meal> existing = mealRepository.findByUserAndTypeAndDate(user, meal.getType(), meal.getDate());
        if (existing.isPresent()) {
            return existing.get(); // optionally just return it
        }

        Meal newMeal = new Meal();
        newMeal.setUser(user);
        newMeal.setType(meal.getType());
        newMeal.setDate(meal.getDate());

        return mealRepository.save(newMeal);
    }
}
