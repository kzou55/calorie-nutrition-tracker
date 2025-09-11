package com.kzou55.calorie.nutrition.tracker.backend.repository;

import com.kzou55.calorie.nutrition.tracker.backend.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {}

