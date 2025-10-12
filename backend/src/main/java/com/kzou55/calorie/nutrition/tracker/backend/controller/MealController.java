package com.kzou55.calorie.nutrition.tracker.backend.controller;

import com.kzou55.calorie.nutrition.tracker.backend.model.FoodItem;
import com.kzou55.calorie.nutrition.tracker.backend.model.Meal;
import com.kzou55.calorie.nutrition.tracker.backend.model.MealFoodEntry;
import com.kzou55.calorie.nutrition.tracker.backend.model.User;
import com.kzou55.calorie.nutrition.tracker.backend.security.CustomUserDetails;
import com.kzou55.calorie.nutrition.tracker.backend.service.MealService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    // Need to get all meals
    // /api/meals
    @GetMapping
    public List<Meal> getMealsForUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getUser().getId();
        return mealService.getMealsForUser(userId);
    }

    // Getting a user's meal for the given date
    @GetMapping("/date/{date}")
    public List<Meal> getMealsForUserOnDate(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Long userId = userDetails.getUser().getId();
        return mealService.getMealsForUserOnDate(userId, date);
    }




    // Creating a meal for a user on the given date
    // /api/meal
    @PostMapping
    public ResponseEntity<Meal> createMeal(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody Meal meal) {
        Meal createdMeal = mealService.createMeal(userDetails.getUser(), meal);
        return ResponseEntity.ok(createdMeal);
    }

    /**
     * Adds a food entry to a meal.
     *
     * Frontend should send a MealFoodEntry in the request body.
     *
     * - If the food was searched from Nutritionix:
     *      - Send the food's name, calories, protein, carbs, fat, and set id=null
     *      - isUserAdded=false
     *
     * - If the food was manually added by the user:
     *      - Send the food details with isUserAdded=true
     *
     * The backend will:
     * - Check if the food already exists in the DB
     * - Save user-added foods or new Nutritionix foods
     */
    @PostMapping("/{mealId}/entries")
    public ResponseEntity<Meal> addFoodToMeal(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long mealId,
            @RequestBody MealFoodEntry entry,
            @RequestParam(required = false, defaultValue = "false") boolean isUserAdded) {

        Long userId = userDetails.getUser().getId();
        Meal updatedMeal = mealService.addFoodToMeal(userId, mealId, entry, isUserAdded);
        return ResponseEntity.ok(updatedMeal);
    }

    // Deleting a food entry from a meal
    // /api/meals/{mid}/entries/{eid}
    @DeleteMapping("/{mealId}/entries/{entryId}")
    public ResponseEntity<Meal> removeFoodFromMeal(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                   @PathVariable Long mealId,
                                                   @PathVariable Long entryId) {

        Long userId = userDetails.getUser().getId();
        Meal updatedMeal = mealService.removeFoodFromMeal(userId, mealId, entryId);
        return ResponseEntity.ok(updatedMeal);
    }

    // Add update mealentry later


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        if (mealService.existsById(id)) {
            mealService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get a specific meal
    // ./api/meals/{id}
    @GetMapping("/{requestedId}")
    public ResponseEntity<Meal> getRequestedMeal(@PathVariable Long requestedId) {
        Optional<Meal> meal = mealService.findMealById(requestedId);

        if (meal.isPresent()) {
            return ResponseEntity.ok(meal.get());
        } else {
            return ResponseEntity.notFound().build();

        }
    }
}
