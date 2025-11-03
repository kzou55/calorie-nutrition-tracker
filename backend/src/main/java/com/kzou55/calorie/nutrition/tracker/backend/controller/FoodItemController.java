package com.kzou55.calorie.nutrition.tracker.backend.controller;


import com.kzou55.calorie.nutrition.tracker.backend.model.FoodItem;
import com.kzou55.calorie.nutrition.tracker.backend.repository.FoodItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
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
        } else {
            return ResponseEntity.notFound().build();

        }
    }

    @PostMapping
    public ResponseEntity<Void> createFoodItem(@RequestBody FoodItem newFoodItem, UriComponentsBuilder ucb) {
        FoodItem savedFoodItem = foodItemRepository.save(newFoodItem);
        URI locationOfNewFoodItem = ucb
                .path("/api/fooditems/{id}")
                .buildAndExpand(savedFoodItem.getId())
                .toUri();
        return ResponseEntity.created(locationOfNewFoodItem).build();
    }

    // PUT /api/fooditems/{id}
    @PutMapping("/{id}")
    public ResponseEntity<FoodItem> updateFoodItem(@PathVariable Long id, @RequestBody FoodItem foodItemUpdate) {
        Optional<FoodItem> optionalFoodItem = foodItemRepository.findById(id);
        if (!optionalFoodItem.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        else{
            FoodItem foodItem = optionalFoodItem.get();
            FoodItem updatedFoodItem =  new FoodItem(foodItem.getId(), foodItemUpdate.getName(), foodItemUpdate.getCalories(), foodItemUpdate.getProtein());
            foodItemRepository.save(updatedFoodItem);
            return ResponseEntity.noContent().build();
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
