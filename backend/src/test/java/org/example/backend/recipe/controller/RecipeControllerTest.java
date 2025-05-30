package org.example.backend.recipe.controller;

import org.example.backend.recipe.model.*;
import org.example.backend.recipe.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
class RecipeControllerTest {
    
    @Autowired
    MockMvc mockMvc;
    
    @Autowired
    RecipeRepository recipeRepository;
    
    RecipeModel testRecipe = new RecipeModel(
            "test",
            "123",
            List.of( new IngredientGroupModel(
                    "testgroup",
                    List.of( new RecipeIngredientModel(
                            "1234",
                            "testingredient",
                            1.4,
                            UnitEnum.LITER,
                            new NutritionValuesModel( 1, 2, 3, 4, null ),
                            false,
                            ""
                    ) ) ) ),
            new NutritionValuesModel( 1, 2, 3, 4, null ),
            20,
            null,
            List.of( "" ),
            "image"
    );
    
    @Test
    void getAllRecipes() throws Exception {
        recipeRepository.save( testRecipe );
        
        mockMvc.perform( MockMvcRequestBuilders.get( "/api/recipe" ) )
                .andExpect( MockMvcResultMatchers.status().isOk() )
                .andExpect( MockMvcResultMatchers.content().json( """
                        [
                            {
                                "title": "test",
                                "id": "123",
                                "ingredients": [
                                    {
                                        "name": "testgroup",
                                        "ingredients": [
                                            {
                                                "id": "1234",
                                                "name": "testingredient",
                                                "amount": 1.4,
                                                "unit": "LITER",
                                                "nutritionValues": {
                                                    "fat": 1,
                                                    "protein": 2,
                                                    "carbs": 3,
                                                    "calories": 4,
                                                    "skaldeman": null
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "nutritionValues": {
                                    "fat": 1,
                                    "protein": 2,
                                    "carbs": 3,
                                    "calories": 4,
                                    "skaldeman": null
                                },
                                "totalTime": 20,
                                "allergens": null,
                                "tags": [""],
                                "image": "image"
                            }
                        ]
                        """ ) );
    }
}