package com.kzou55.calorie.nutrition.tracker.backend.service;

import com.kzou55.calorie.nutrition.tracker.backend.model.*;
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
    public Meal addFoodToMeal(Long userId, Long mealId, MealFoodEntry entry, boolean isUserAdded) {

        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new EntityNotFoundException("Meal not found with id: " + mealId));

        if (!meal.getUser().getId().equals(userId)) {
            throw new SecurityException("Meal does not belong to this user");
        }

        FoodItem foodItem = entry.getFoodItem();

        if (foodItem.getId() != null) {// Food already exists in DB
            FoodItem existingFood = foodItemRepository.findById(foodItem.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Food item not found with id: " + foodItem.getId()));
            entry.setFoodItem(existingFood);
        }
        else if (isUserAdded) {// User manually added new food
            foodItem.setSource(FoodSource.User);
            FoodItem savedFood = foodItemRepository.save(foodItem);
            entry.setFoodItem(savedFood);
        }
        else {
            // Food came from frontend search
            // Check DB to avoid duplicates
            FoodItem savedFood = foodItemRepository
                    .findByNameAndSource(foodItem.getName(), FoodSource.NUTRITIONIX)
                    .orElseGet(() -> {
                        foodItem.setSource(FoodSource.NUTRITIONIX);
                        return foodItemRepository.save(foodItem);
                    });
            entry.setFoodItem(savedFood);
        }

        // Attach the entry to this meal
        entry.setMeal(meal);
        meal.getMealFoodEntries().add(entry);

        return mealRepository.save(meal);
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
