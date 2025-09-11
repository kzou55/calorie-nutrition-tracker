package com.kzou55.calorie.nutrition.tracker.backend.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "app_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;

    // Will add password and authentication once mvp is finished
}

