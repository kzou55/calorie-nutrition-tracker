package com.kzou55.calorie.nutrition.tracker.backend.controller;

import com.kzou55.calorie.nutrition.tracker.backend.model.FoodItem;
import com.kzou55.calorie.nutrition.tracker.backend.model.Meal;
import com.kzou55.calorie.nutrition.tracker.backend.model.MealFoodEntry;
import com.kzou55.calorie.nutrition.tracker.backend.repository.MealRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealRepository mealRepository;

    public MealController(MealRepository mealRepository) {
        this.mealRepository = mealRepository;
    }


    @GetMapping
    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    @GetMapping("/{requestedId}")
    public ResponseEntity<Meal> getRequestedMeal(@PathVariable Long requestedId) {
        Optional<Meal> meal = mealRepository.findById(requestedId);

        if (meal.isPresent()) {
            return ResponseEntity.ok(meal.get());
        } else {
            return ResponseEntity.notFound().build();

        }
    }

    @PostMapping
    public ResponseEntity<Void> createMeal(@RequestBody Meal newMeal, UriComponentsBuilder ucb) {

        // Connecting the bidirectional relationship between meals <-> mealEntry
        for (MealFoodEntry entry : newMeal.getMealFoodEntries()) {

            FoodItem existingFood = foodItemRepository.findById(entry.getFoodItem().getId())
                    .orElseThrow(() -> new RuntimeException("FoodItem not found with id " + entry.getFoodItem().getId()));

            entry.setMeal(newMeal);
            entry.setFoodItem(existingFood);
        }

        Meal savedMeal = mealRepository.save(newMeal);
        URI locationOfNewFoodItem = ucb
                .path("/api/meals/{id}")
                .buildAndExpand(savedMeal.getId())
                .toUri();
        return ResponseEntity.created(locationOfNewFoodItem).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        if (mealRepository.existsById(id)) {
            mealRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
