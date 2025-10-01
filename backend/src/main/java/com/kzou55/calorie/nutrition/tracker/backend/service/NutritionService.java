package com.kzou55.calorie.nutrition.tracker.backend.service;

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
        // TODO: Parse JSON using Jackson/Gson and create a FoodItem
        // For example purposes:
        FoodItem item = new FoodItem();
        item.setName("Example"); // replace with parsed name
        item.setCalories(100);
        item.setProtein(5);
        item.setCarbs(20);
        item.setFat(2);
        item.setSource(FoodSource.NUTRITIONIX);
        return item;
    }
}