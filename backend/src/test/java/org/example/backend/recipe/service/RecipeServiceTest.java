package org.example.backend.recipe.service;

import org.example.backend.recipe.model.*;
import org.example.backend.recipe.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RecipeServiceTest {
    
    private final RecipeRepository mockRecipeRepository = Mockito.mock( RecipeRepository.class );
    private final RecipeService recipeService = new RecipeService( mockRecipeRepository );
    
    RecipeModel testRecipe = new RecipeModel(
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
            new NutritionValuesModel( 1, 2, 3, 4, null ),
            20,
            null,
            List.of( "" ),
            "image"
    );
    
    @Test
    void getAllRecipes() {
        RecipeDetailModel testDetailRecipe = new RecipeDetailModel(
                "123",
                "test",
                testRecipe.ingredients(),
                List.of(),
                testRecipe.nutritionValues(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                10,
                10,
                20,
                4,
                null,
                List.of( "" ),
                "image"
        );
        
        Mockito.when( mockRecipeRepository.findAll() ).thenReturn( List.of( testDetailRecipe ) );
        
        List<RecipeModel> result = recipeService.getAllRecipes();
        assertEquals( List.of( testRecipe ), result );
    }
}