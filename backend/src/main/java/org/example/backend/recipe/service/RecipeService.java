package org.example.backend.recipe.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.recipe.model.*;
import org.example.backend.recipe.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeService {
    
    private final RecipeRepository recipeRepository;
    private final IdService idService;
    
    public List<RecipeModel> getAllRecipes() {
        List<RecipeDetailModel> foundRecipes = recipeRepository.findAll();
        List<RecipeModel> reducedRecipes = new ArrayList<>();
        for ( RecipeDetailModel recipe : foundRecipes ) {
            reducedRecipes.add( new RecipeModel(
                    recipe.id(),
                    recipe.title(),
                    recipe.ingredients(),
                    recipe.nutritionValues(),
                    recipe.totalTime(),
                    recipe.allergens(),
                    recipe.tags(),
                    recipe.image()
            ) );
        }
        return reducedRecipes;
    }
    
    public Optional<RecipeDetailModel> getRecipeById( String id ) {
        return recipeRepository.findById( id );
    }
    
    public RecipeDetailModel addRecipe( RecipeDetailModelDto recipeDto ) {
        List<String> allergens = recipeDto.ingredients().stream()
                .flatMap( ingredientGroup -> ingredientGroup.ingredients().stream() )
                .map( RecipeIngredientModel::allergens )
                .filter( Objects::nonNull )
                .map( Arrays::toString )
                .collect( Collectors.toList() );
        
        if ( allergens.isEmpty() ) {
            allergens = null;
        }
        
        RecipeDetailModel recipe = new RecipeDetailModel(
                idService.randomId(),
                recipeDto.title(),
                recipeDto.ingredients(),
                recipeDto.steps(),
                recipeDto.nutritionValues(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                recipeDto.preparationTime(),
                recipeDto.cookingTime(),
                recipeDto.cookingTime() + recipeDto.preparationTime(),
                recipeDto.defaultPortions(),
                allergens,
                recipeDto.tags(),
                recipeDto.image()
        );
        recipeRepository.save( recipe );
        return recipe;
    }
}
