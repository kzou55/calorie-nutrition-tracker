package com.kzou55.calorie.nutrition.tracker.backend.model;

import jakarta.persistence.*;

@Entity
public class MealFoodEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "meal_id")
    private Meal meal;

    @ManyToOne
    @JoinColumn(name = "food_item_id")
    private FoodItem foodItem;

    private int quantity;  // e.g., 3 bananas

    // Constructors, getters, setters
}
