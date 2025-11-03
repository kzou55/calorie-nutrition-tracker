package com.kzou55.calorie.nutrition.tracker.backend.repository;

import com.kzou55.calorie.nutrition.tracker.backend.model.FoodItem;
import com.kzou55.calorie.nutrition.tracker.backend.model.FoodSource;
import com.kzou55.calorie.nutrition.tracker.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    Optional<FoodItem> findByNameAndSource(String name, FoodSource foodSource);

    List<FoodItem> findBySource(FoodSource source);
    Optional<FoodItem> findByNameAndUser(String name, User user);
}

