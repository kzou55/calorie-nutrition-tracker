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

    public FoodItem(int i, String chicekn, int i1, int i2) {
        this.id = (long) i;
        this.name = chicekn;
        this.calories = i1;
        this.protein = i2;
    }

    /**
    private double carbohydrates;
    private double fat;
    private double fiber;
    private double sugars;
    private String servingSize;
     */


    public String getName() {
        return name;
    }

    public int getCalories() {
        return calories;
    }

    public double getProtein() {
        return protein;
    }
    /**
    public double getCarbohydrates() {
        return carbohydrates;
    }

    public double getFat() {
        return fat;
    }

    public double getFiber() {
        return fiber;
    }

    public double getSugars() {
        return sugars;
    }

    public String getServingSize() {
        return servingSize;
    }
    */
    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    /**
    public void setCarbohydrates(double carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public void setFat(double fat) {
        this.fat = fat;
    }

    public void setFiber(double fiber) {
        this.fiber = fiber;
    }

    public void setSugars(double sugars) {
        this.sugars = sugars;
    }

    public void setServingSize(String servingSize) {
        this.servingSize = servingSize;
    }
    */
}

