package org.example.backend.recipe.service;

import org.example.backend.recipe.model.*;
import org.example.backend.recipe.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RecipeServiceTest {
    
    private final RecipeRepository mockRecipeRepository = Mockito.mock( RecipeRepository.class );
    private final IdService idService = Mockito.mock( IdService.class );
    private final RecipeService recipeService = new RecipeService( mockRecipeRepository, idService );
    
    RecipeModel testRecipe = new RecipeModel(
            "123",
            "test",
            List.of( new IngredientGroupModel(
                    "testgroup",
                    List.of( new RecipeIngredientModel(
                            "1234",
                            "testingredient",
                            1.4,
                            "LITER",
                            new NutritionValuesModel( 1, 2, 3, 4, null ),
                            null,
                            ""
                    ) ) ) ),
            new NutritionValuesModel( 1, 2, 3, 4, null ),
            20,
            null,
            List.of( "" ),
            "image"
    );
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
    
    @Test
    void getAllRecipes() {
        Mockito.when( mockRecipeRepository.findAll() ).thenReturn( List.of( testDetailRecipe ) );
        
        List<RecipeModel> result = recipeService.getAllRecipes();
        assertEquals( List.of( testRecipe ), result );
    }
    
    @Test
    void getRecipeById_returnsRecipeDetails_withValidId() {
        Mockito.when( mockRecipeRepository.findById( "123" ) ).thenReturn( Optional.of( testDetailRecipe ) );
        Optional<RecipeDetailModel> result = recipeService.getRecipeById( "123" );
        assertEquals( Optional.of( testDetailRecipe ), result );
    }
    
    @Test
    void getRecipeById_returnsEmpty_withInvalidId() {
        Mockito.when( mockRecipeRepository.findById( "124" ) ).thenReturn( Optional.empty() );
        Optional<RecipeDetailModel> result = recipeService.getRecipeById( "124" );
        assertEquals( Optional.empty(), result );
    }
    
    @Test
    void addRecipe_addsNewRecipeSuccessfully() {
        Mockito.when( idService.randomId() ).thenReturn( "new-id" );
        
        RecipeDetailModelDto newRecipeDto = new RecipeDetailModelDto(
                "new-recipe",
                List.of( new IngredientGroupModel(
                        "group1",
                        List.of( new RecipeIngredientModel(
                                "1",
                                "ingredient1",
                                1.0,
                                "GRAM",
                                new NutritionValuesModel( 0, 0, 0, 0, null ),
                                null,
                                null
                        ) )
                ) ),
                List.of(),
                new NutritionValuesModel( 0, 0, 0, 0, null ),
                5,
                10,
                2,
                List.of( "tag1" ),
                "new-image"
        );
        
        RecipeDetailModel expectedRecipe = new RecipeDetailModel(
                "new-id",
                "new-recipe",
                newRecipeDto.ingredients(),
                newRecipeDto.steps(),
                newRecipeDto.nutritionValues(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                newRecipeDto.preparationTime(),
                newRecipeDto.cookingTime(),
                15,
                newRecipeDto.defaultPortions(),
                List.of( "[null]" ),
                newRecipeDto.tags(),
                newRecipeDto.image()
        );
        
        Mockito.when( mockRecipeRepository.save( Mockito.any( RecipeDetailModel.class ) ) ).thenReturn( expectedRecipe );
        
        RecipeDetailModel result = recipeService.addRecipe( newRecipeDto );
        
        assertEquals( expectedRecipe.title(), result.title() );
        assertEquals( expectedRecipe.ingredients(), result.ingredients() );
        assertEquals( expectedRecipe.tags(), result.tags() );
        Mockito.verify( mockRecipeRepository ).save( Mockito.any( RecipeDetailModel.class ) );
    }
    
    @Test
    void addRecipe_generatesRandomId() {
        Mockito.when( idService.randomId() ).thenReturn( "random-id" );
        
        RecipeDetailModelDto newRecipeDto = new RecipeDetailModelDto(
                "random-title",
                List.of(),
                List.of(),
                new NutritionValuesModel( 0, 0, 0, 0, null ),
                10,
                15,
                4,
                List.of(),
                "random-image"
        );
        
        recipeService.addRecipe( newRecipeDto );
        
        Mockito.verify( idService ).randomId();
    }
}