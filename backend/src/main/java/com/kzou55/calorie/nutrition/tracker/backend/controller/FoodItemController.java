package com.kzou55.calorie.nutrition.tracker.backend.controller;


import com.kzou55.calorie.nutrition.tracker.backend.model.FoodItem;
import com.kzou55.calorie.nutrition.tracker.backend.repository.FoodItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/fooditems")
public class FoodItemController {

    private final FoodItemRepository foodItemRepository;

    public FoodItemController(FoodItemRepository foodItemRepository) {
        this.foodItemRepository = foodItemRepository;
    }

    @GetMapping
    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    @GetMapping("/{requestedID}")
    public ResponseEntity<FoodItem> getFoodItem(@PathVariable Long requestedID) {
        Optional<FoodItem> foodItem = foodItemRepository.findById(requestedID);

        if (foodItem.isPresent()) {
            return ResponseEntity.ok(foodItem.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public FoodItem createFoodItem(FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }


    // PUT /api/fooditems/{id}
    @PutMapping("/{id}")
    public ResponseEntity<FoodItem> updateFoodItem(@PathVariable Long id, @RequestBody FoodItem updatedFoodItem) {
        Optional<FoodItem> existingFoodItem = foodItemRepository.findById(id);

        if (existingFoodItem.isPresent()) {
            FoodItem foodItem = existingFoodItem.get();
            // Update fields
            foodItem.setName(updatedFoodItem.getName());
            foodItem.setCalories(updatedFoodItem.getCalories());
            foodItem.setProtein(updatedFoodItem.getProtein());
            /**
            foodItem.setCarbohydrates(updatedFoodItem.getCarbohydrates());
            foodItem.setFat(updatedFoodItem.getFat());
            foodItem.setFiber(updatedFoodItem.getFiber());
            foodItem.setSugars(updatedFoodItem.getSugars());
            foodItem.setServingSize(updatedFoodItem.getServingSize());
             */

            FoodItem savedFoodItem = foodItemRepository.save(foodItem);
            return ResponseEntity.ok(savedFoodItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodItem(@PathVariable Long id) {
        if (foodItemRepository.existsById(id)) {
            foodItemRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
