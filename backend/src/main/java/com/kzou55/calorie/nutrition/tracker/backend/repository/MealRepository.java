package com.kzou55.calorie.nutrition.tracker.backend.repository;


import com.kzou55.calorie.nutrition.tracker.backend.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRepository extends JpaRepository<Meal, Long> {
}
