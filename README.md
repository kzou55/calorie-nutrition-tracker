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

## Features / To-Do

### Current Implemented Features
- User authentication (login/register)
- Meal creation and management
- Adding/removing food entries to meals
- PostgreSQL database for production
- Nutritionx API integration
- Allows custom or NutritionX searched foods as food entry

### Currently Working On
  

### Frontend To-Do
- Dynamically calculate and display total calories, protein, carbs, and fat for meals (currently done in frontend)

### Backend To-Do / Refactor
- Calculate meal total nutrition in backend
- Implement DTOs for login/register for better API design and separation of concerns
- Expand `JwtUtil` / `JwtFilter` to include roles, claims, and refresh tokens
- Persist JWT tokens and rehydrate backend/frontend state (Redux) to prevent logout on refresh



### To run
- Do "npm run dev" for the frontend
- Do  
- Backend is deployed on render which takes a while to start as it's on the free tier. 
