package com.kzou55.calorie.nutrition.tracker.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kzou55.calorie.nutrition.tracker.backend.model.FoodItem;
import com.kzou55.calorie.nutrition.tracker.backend.model.FoodSource;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class NutritionService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final HttpHeaders headers;
    private final String BASE_URL = "https://trackapi.nutritionix.com/v2/natural/nutrients";

    public NutritionService(@Value("${nutritionix.appId}") String appId,
                            @Value("${nutritionix.apiKey}") String apiKey) {
        headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-app-id", appId);
        headers.set("x-app-key", apiKey);
    }

    public FoodItem fetchNutrition(String query) {
        String body = "{ \"query\": \"" + query + "\" }";
        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.exchange(BASE_URL, HttpMethod.POST, entity, String.class);

        return parseNutritionJson(response.getBody());
    }

    private FoodItem parseNutritionJson(String json) {

        ObjectMapper mapper = new ObjectMapper();

        try {
            JsonNode root = mapper.readTree(json);
            JsonNode foodsArray = root.path("foods");

            if (foodsArray.isArray() && !foodsArray.isEmpty()) {
                JsonNode foodNode = foodsArray.get(0);
                FoodItem item = new FoodItem();
                item.setName(foodNode.path("food_name").asText());
                item.setCalories(foodNode.path("nf_calories").asDouble());
                item.setProtein(foodNode.path("nf_protein").asDouble());
                item.setCarbs(foodNode.path("nf_total_carbohydrate").asDouble());
                item.setFat(foodNode.path("food_name").asDouble());
                item.setSource(FoodSource.NUTRITIONIX);

                return item;
            }
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse Nutritionx JSON");
        }
    }
}