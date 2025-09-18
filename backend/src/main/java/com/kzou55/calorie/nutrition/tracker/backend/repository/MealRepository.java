package com.kzou55.calorie.nutrition.tracker.backend.repository;


import com.kzou55.calorie.nutrition.tracker.backend.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Long> {
    List<Meal> findByUserId(Long userId);
    List<Meal> findByUserIdAndDate(Long id, LocalDate date);
}
