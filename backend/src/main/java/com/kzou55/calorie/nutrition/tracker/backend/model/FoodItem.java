package com.kzou55.calorie.nutrition.tracker.backend.model;

import jakarta.persistence.*;
import lombok.*;



/**
 * A FoodItem class that represents a singular food an individual eats during their meal
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int calories;
    private double protein;


}

