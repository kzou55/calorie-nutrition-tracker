package com.kzou55.calorie.nutrition.tracker.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    private String type;  // e.g., "Lunch", "Dinner"

    private LocalDate date; // Date the meal was eaten

    @ManyToOne(fetch = FetchType.LAZY)  // don't pull the user unless you ask for it
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<MealFoodEntry> mealFoodEntries = new HashSet<>();
}
