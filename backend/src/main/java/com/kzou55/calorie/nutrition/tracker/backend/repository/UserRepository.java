package com.kzou55.calorie.nutrition.tracker.backend.repository;

import com.kzou55.calorie.nutrition.tracker.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
