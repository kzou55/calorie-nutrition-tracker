# 🥗 Calorie & Nutrition Tracker

A full-stack application that allows users to track their daily food intake, calories, and key nutritional values.

---

## 🚀 Features

- Track individual **food items** with nutrition data
- Log **meals** containing multiple food items
- (Planned) User accounts for personalized tracking
- RESTful API (Spring Boot)
- Frontend in React + TypeScript (WIP)

---

## 🛠 Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- H2 (in-memory dev database)
- Maven

### Frontend (Planned)
- React + TypeScript

---

## 📂 Project Structure

    calorie-nutrition-tracker/
    ├── backend/
    │   ├── src/main/java/com/yourname/calorie/
    │   │   ├── model/          # JPA Entities (FoodItem, Meal, User)
    │   │   ├── repository/     # Spring Data JPA Repositories
    │   │   ├── controller/     # REST Controllers
    │   │   └── ...             # Other config / service
    │   └── ...
    ├── frontend/               # (To be added)
    └── README.md
