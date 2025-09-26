# ----------------------------
# Stage 1: Build
# ----------------------------
FROM maven:3.9-eclipse-temurin-21-alpine AS build


# Set working directory
WORKDIR /app

# Copy pom.xml first to leverage Docker cache
COPY pom.xml .

# Download dependencies only
RUN mvn dependency:go-offline -B

# Copy the source code
COPY src ./src

# Package the app (skip tests to speed up)
RUN mvn clean package -DskipTests

# ----------------------------
# Stage 2: Run
# ----------------------------
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","app.jar"]
