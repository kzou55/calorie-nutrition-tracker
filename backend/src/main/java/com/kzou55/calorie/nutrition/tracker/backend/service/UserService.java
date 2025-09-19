package com.kzou55.calorie.nutrition.tracker.backend.service;

import com.kzou55.calorie.nutrition.tracker.backend.model.Meal;
import com.kzou55.calorie.nutrition.tracker.backend.model.User;
import com.kzou55.calorie.nutrition.tracker.backend.repository.MealRepository;
import com.kzou55.calorie.nutrition.tracker.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final MealRepository mealRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User registerUser(User user) {
        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user
        User savedUser = userRepository.save(user);

        // Create default meals
        LocalDate today = LocalDate.now();
        List<Meal> defaultMeals = List.of(
                Meal.builder().date(today).type("Breakfast").user(savedUser).build(),
                Meal.builder().date(today).type("Lunch").user(savedUser).build(),
                Meal.builder().date(today).type("Dinner").user(savedUser).build()
        );
        mealRepository.saveAll(defaultMeals);
        savedUser.getMeals().addAll(defaultMeals);

        return savedUser;
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}