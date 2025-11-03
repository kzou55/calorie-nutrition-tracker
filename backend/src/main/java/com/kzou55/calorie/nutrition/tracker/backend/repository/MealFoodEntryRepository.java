package com.kzou55.calorie.nutrition.tracker.backend.repository;

import com.kzou55.calorie.nutrition.tracker.backend.model.FoodItem;
import com.kzou55.calorie.nutrition.tracker.backend.model.MealFoodEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealFoodEntryRepository extends JpaRepository<MealFoodEntry, Long> {
    long countByFoodItem(FoodItem foodItem);
    boolean existsByFoodItem(FoodItem foodItem);
}