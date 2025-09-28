# 🥗 Calorie & Nutrition Tracker

A full-stack web application to help users track daily food intake, calories, and key nutritional values.

---

## 🚀 Features
- Track individual food items with nutrition data  
- Log meals containing multiple food items  
- User authentication: login/register implemented  
- RESTful API powered by Spring Boot  
- Frontend in React + TypeScript (feature-based architecture, Vite-powered)  

---

## 🛠 Tech Stack

**Backend:**  
- Java 21  
- Spring Boot  
- Spring Data JPA  
- PostgreSQL (deployed)  
- Maven  

**Frontend:**  
- React  
- TypeScript  
- Vite (dev server & build tool)  
- Yarn (package manager)  

---

## 📂 Project Structure

**Backend**
~~~~
backend/
├── config/       # Spring Boot configuration files
├── controller/   # REST Controllers
├── model/        # JPA Entities (FoodItem, Meal, User)
├── repository/   # Spring Data JPA Repositories
├── security/     # Security configuration (JWT, authentication)
└── service/      # Business logic
~~~~

**Frontend**
~~~~
frontend/
├── app/          # Main app initialization, routing
├── assets/       # Images, icons, fonts
├── constants/    # Static constants used across the app
├── features/     # Feature-specific code (auth, meals, etc.)
├── styles/       # Global CSS / SCSS styles
├── types/        # TypeScript type definitions
└── utils/        # Utility functions/helpers
~~~~



