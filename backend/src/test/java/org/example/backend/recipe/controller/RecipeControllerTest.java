package org.example.backend.recipe.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.recipe.model.*;
import org.example.backend.recipe.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
class RecipeControllerTest {
    
    @Autowired
    MockMvc mockMvc;
    
    @Autowired
    RecipeRepository recipeRepository;
    
    RecipeDetailModel testRecipeDetails = new RecipeDetailModel(
            "123",
            "test",
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
            List.of( new StepGroupModel( "test", List.of( "step1", "step2" ) ) ),
            new NutritionValuesModel( 1, 2, 3, 4, null ),
            LocalDateTime.of( 2021, 1, 1, 0, 0 ),
            LocalDateTime.of( 2021, 1, 1, 0, 0 ),
            20,
            20,
            20,
            20,
            null,
            List.of( "" ),
            "image"
    );
    RecipeModel testRecipe = new RecipeModel(
            testRecipeDetails._id(),
            testRecipeDetails.title(),
            testRecipeDetails.ingredients(),
            testRecipeDetails.nutritionValues(),
            testRecipeDetails.totalTime(),
            testRecipeDetails.allergens(),
            testRecipeDetails.tags(),
            testRecipeDetails.image()
    );
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void getAllRecipes() throws Exception {
        recipeRepository.save( testRecipeDetails );
        
        mockMvc.perform( MockMvcRequestBuilders.get( "/api/recipe" ) )
                .andExpect( MockMvcResultMatchers.status().isOk() )
                .andExpect( MockMvcResultMatchers.content().json( objectMapper.writeValueAsString( List.of( testRecipe ) ) ) );
    }
    
    @Test
    void getRecipeById_returnsRecipeDetails_withValidId() throws Exception {
        recipeRepository.save( testRecipeDetails );
        
        mockMvc.perform( MockMvcRequestBuilders.get( "/api/recipe/" + testRecipeDetails._id() ) )
                .andExpect( MockMvcResultMatchers.status().isOk() )
                .andExpect( MockMvcResultMatchers.content().json( objectMapper.writeValueAsString( testRecipeDetails ) ) );
        
    }
    
    @Test
    void getRecipeById_returns404_withInvalidId() throws Exception {
        recipeRepository.save( testRecipeDetails );
        
        mockMvc.perform( MockMvcRequestBuilders.get( "/api/recipe/1234" ) )
                .andExpect( MockMvcResultMatchers.status().isNotFound() );
        
    }
}