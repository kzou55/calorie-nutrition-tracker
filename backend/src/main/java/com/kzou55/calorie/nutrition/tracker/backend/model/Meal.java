package com.kzou55.calorie.nutrition.tracker.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

/**
 * A meal class that represents a collection of food that an individual eats
 * Has a meal id, Type of meal, date, and its collection of foods
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;  // e.g., "Lunch", "Dinner"

    private LocalDate date; // Date the meal was eaten


    private List<FoodItem> foodItems;

    // Optional: user ID if you add user management later
    // private Long userId;
}
