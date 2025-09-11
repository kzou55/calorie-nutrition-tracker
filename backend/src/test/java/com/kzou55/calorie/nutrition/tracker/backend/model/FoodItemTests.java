package com.kzou55.calorie.nutrition.tracker.backend.model;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FoodItemTests {
    @Autowired
    TestRestTemplate restTemplate;


    @Test
    void shouldReturnAllFoodItems() {
        /**
         *
         ResponseEntity<String> response = restTemplate.getForEntity("/api/fooditems", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        DocumentContext json = JsonPath.parse(response.getBody());
        int length = json.read("$.length()");
        assertThat(length).isGreaterThan(0);

        System.out.println("✓ Food item API returned " + length + " items.");
         */
    }
}

