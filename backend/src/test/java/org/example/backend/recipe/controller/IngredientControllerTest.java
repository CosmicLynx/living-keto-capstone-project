package org.example.backend.recipe.controller;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.example.backend.recipe.model.*;
import org.example.backend.recipe.repository.IngredientRepository;
import org.example.backend.restclient.RestTemplateConfig;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.*;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.*;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Import(OAuth2TestConfig.class)
@ActiveProfiles("test")
class IngredientControllerTest {

    @Autowired
    IngredientRepository ingredientRepository;
    IngredientModel testIngredient = new IngredientModel(
            "1",
            "egg",
            List.of(new NutritionValuesPerUnitModel(
                    10,
                    UnitEnum.GRAM,
                    new NutritionValuesModel(
                            1,
                            1,
                            1,
                            1,
                            1.0))),
            null);
    @Autowired
    RestTemplateConfig restTemplateConfig;
    @Autowired
    private MockMvc mockMvc;
    private MockRestServiceServer mockServer;
    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockServer = MockRestServiceServer.createServer(restTemplateConfig.restTemplate());
        mockServer.reset();
    }

    @Tag("fatsecret")
    @Test
    @WithMockUser(roles = "ADMIN")
    void searchNewIngredients() throws Exception {

        mockServer
                .expect(requestTo(
                        "https://platform.fatsecret.com/rest/foods/search/v1?format=json&search_expression=test"))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess(
                        """
                                {
                                    "foods": {
                                        "food": [
                                            {
                                                "food_description": "Per 100g - Calories: 147kcal | Fat: 9.94g | Carbs: 0.77g | Protein: 12.58g",
                                                "food_id": "3092",
                                                "food_name": "Egg",
                                                "food_type": "Generic",
                                                "food_url": "https://www.fatsecret.com/calories-nutrition/generic/egg-whole-raw"
                                            },
                                            {
                                                "brand_name": "Great Value",
                                                "food_description": "Per 1 egg - Calories: 70kcal | Fat: 5.00g | Carbs: 0.00g | Protein: 6.00g",
                                                "food_id": "45771060",
                                                "food_name": "Egg",
                                                "food_type": "Brand",
                                                "food_url": "https://www.fatsecret.com/calories-nutrition/great-value/egg"
                                            }
                                        ],
                                        "max_results": "20",
                                        "page_number": "0",
                                        "total_results": "2011"
                                    }
                                }
                                """,
                        MediaType.APPLICATION_JSON));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/ingredient/new/egg"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.foods.food[?(@.food_id=='3092')]").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.foods.food[?(@.food_id=='45771060')]").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.foods.food[0].food_name").value("Egg"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.foods.food[0].food_description")
                        .value("Per 100g - Calories: 147kcal | Fat: 9.94g | Carbs: 0.77g | Protein: 12.58g"));

    }

    @Tag("fatsecret")
    @Test
    @WithMockUser(roles = "ADMIN")
    void newIngredientDetails() throws Exception {
        mockServer.expect(requestTo("https://platform.fatsecret.com/rest/food/v4?format=json&food_id=3092"))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess(
                        """
                                {
                                     "food": {
                                         "food_id": "3092",
                                         "food_name": "Egg",
                                         "food_type": "Generic",
                                         "food_url": "https://www.fatsecret.com/calories-nutrition/generic/egg-whole-raw",
                                         "servings": {
                                             "serving": [
                                                 {
                                                     "serving_id": "11206",
                                                     "serving_description": "1 large",
                                                     "serving_url": "https://www.fatsecret.com/calories-nutrition/generic/egg-whole-raw?portionid=11206&portionamount=1.000",
                                                     "metric_serving_amount": "50.000",
                                                     "metric_serving_unit": "g",
                                                     "number_of_units": "1.000",
                                                     "measurement_description": "large",
                                                     "calories": "74",
                                                     "carbohydrate": "0.38",
                                                     "protein": "6.29",
                                                     "fat": "4.97",
                                                     "saturated_fat": "1.550",
                                                     "polyunsaturated_fat": "0.682",
                                                     "monounsaturated_fat": "1.905",
                                                     "cholesterol": "212",
                                                     "sodium": "70",
                                                     "potassium": "67",
                                                     "fiber": "0",
                                                     "sugar": "0.38",
                                                     "vitamin_a": "70",
                                                     "vitamin_c": "0",
                                                     "calcium": "26",
                                                     "iron": "0.92"
                                                 },
                                                 {
                                                     "serving_id": "10270",
                                                     "serving_description": "1 medium",
                                                     "serving_url": "https://www.fatsecret.com/calories-nutrition/generic/egg-whole-raw?portionid=10270&portionamount=1.000",
                                                     "metric_serving_amount": "44.000",
                                                     "metric_serving_unit": "g",
                                                     "number_of_units": "1.000",
                                                     "measurement_description": "medium",
                                                     "calories": "65",
                                                     "carbohydrate": "0.34",
                                                     "protein": "5.54",
                                                     "fat": "4.37",
                                                     "saturated_fat": "1.364",
                                                     "polyunsaturated_fat": "0.600",
                                                     "monounsaturated_fat": "1.676",
                                                     "cholesterol": "186",
                                                     "sodium": "62",
                                                     "potassium": "59",
                                                     "fiber": "0",
                                                     "sugar": "0.34",
                                                     "vitamin_a": "62",
                                                     "vitamin_c": "0.0",
                                                     "calcium": "23",
                                                     "iron": "0.81"
                                                 }
                                             ]
                                         }
                                     }
                                }
                                """,
                        MediaType.APPLICATION_JSON));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/ingredient/new/id?id=3092"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.food.food_id").value("3092"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.food.food_name").value("Egg"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.food.servings.serving[?(@.serving_id=='11206')]").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.food.servings.serving[?(@.serving_id=='10270')]").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.food.servings.serving[0].serving_description")
                        .value("1 large"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.food.servings.serving[0].calories").value("74"));

    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void searchIngredients() throws Exception {

        ingredientRepository.save(testIngredient);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/ingredient/search/egg"))
                .andExpect(status().isOk())
                .andExpect(
                        MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(List.of(testIngredient))));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void addIngredient() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/ingredient/new")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testIngredient)))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(testIngredient)));
    }
}