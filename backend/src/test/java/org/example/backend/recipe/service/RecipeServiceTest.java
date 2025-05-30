package org.example.backend.recipe.service;

import org.example.backend.recipe.model.*;
import org.example.backend.recipe.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

class RecipeServiceTest {
    
    private final RecipeRepository mockRecipeRepository = Mockito.mock( RecipeRepository.class );
    private final RecipeService recipeService = new RecipeService( mockRecipeRepository );
    
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
    void getAllRecipes() {
        List<RecipeModel> recipes = List.of( testRecipe );
        
        Mockito.when( mockRecipeRepository.findAll() ).thenReturn( recipes );
        
        assert recipeService.getAllRecipes().equals( recipes );
    }
}