package com.kzou55.calorie.nutrition.tracker.backend.controller;

import com.kzou55.calorie.nutrition.tracker.backend.model.Meal;
import com.kzou55.calorie.nutrition.tracker.backend.model.MealFoodEntry;
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

    // Adding a food entry to a meal
    // /api/meal/{mid}/entries
    @PostMapping("/{mealId}/entries")
    public ResponseEntity<Meal> addFoodToMeal(@AuthenticationPrincipal CustomUserDetails userDetails,
                                              @PathVariable Long mealId,
                                              @RequestBody MealFoodEntry entry) {

        Long userId = userDetails.getUser().getId();
        Meal updatedMeal = mealService.addFoodToMeal(userId, mealId, entry);
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
