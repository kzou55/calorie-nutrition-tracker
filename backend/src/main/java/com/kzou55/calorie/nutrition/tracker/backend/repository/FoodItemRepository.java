package com.kzou55.calorie.nutrition.tracker.backend.repository;

import com.kzou55.calorie.nutrition.tracker.backend.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    Optional<FoodItem> findById(Long id);

}

