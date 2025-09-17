package com.kzou55.calorie.nutrition.tracker.backend.controller;

import com.kzou55.calorie.nutrition.tracker.backend.model.FoodItem;
import com.kzou55.calorie.nutrition.tracker.backend.model.Meal;
import com.kzou55.calorie.nutrition.tracker.backend.model.MealFoodEntry;
import com.kzou55.calorie.nutrition.tracker.backend.repository.MealRepository;
import com.kzou55.calorie.nutrition.tracker.backend.service.MealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
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
    // ./api/meals
    @GetMapping
    public List<Meal> getAllMeals() {
        return mealService.getMeals();
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
    // Don't need to create a meal, just add/delete food in a meal
    // Adding a food entry to a meal
    // /api/meal/{mid}/foods
    @PostMapping("/{mealId}/foods")
    public ResponseEntity<Meal> addFoodToMeal(@PathVariable Long mealId, @RequestBody MealFoodEntry entry) {
        Meal updatedMeal = mealService.addFoodToMeal(mealId, entry);
        return ResponseEntity.ok(updatedMeal);
    }

    // Deleting a food entry from a meal
    // /api/meals/{mid}/food/{fid}
    @DeleteMapping("/{mealId}/entries/{entryId}")
    public ResponseEntity<Meal> removeFoodFromMeal(@PathVariable Long mealId, @PathVariable Long entryId) {
        Meal updatedMeal = mealService.removeFoodFromMeal(mealId, entryId);
        return ResponseEntity.ok(updatedMeal);
    }

    // Add update mealentry later









    // The following I'm not sure if i need anymore/use for postman testing
    @PostMapping
    public ResponseEntity<Void> createMeal(@RequestBody Meal newMeal, UriComponentsBuilder ucb) {

        Meal savedMeal = mealService.createMeal(newMeal);
        URI locationOfNewMeal = ucb
                .path("/api/meals/{id}")
                .buildAndExpand(savedMeal.getId())
                .toUri();
        return ResponseEntity.created(locationOfNewMeal).build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        if (mealService.existsById(id)) {
            mealService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
