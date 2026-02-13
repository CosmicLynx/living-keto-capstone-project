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
        List<IngredientGroupModel> ingredientGroupsWithIds = recipeDto.ingredients().stream()
                .map( group -> new IngredientGroupModel(
                        group.name(),
                        group.ingredients().stream()
                                .map( ingredient -> new RecipeIngredientModel(
                                        idService.randomId(),
                                        ingredient.name(),
                                        ingredient.amount(),
                                        ingredient.unit(),
                                        ingredient.nutritionValues(),
                                        ingredient.allergens(),
                                        ingredient.hint()
                                ) )
                                .collect( Collectors.toList() )
                ) )
                .toList();
        
        Map<String, String> uniqueAllergensMap = recipeDto.ingredients().stream()
                .flatMap( ingredientGroup -> ingredientGroup.ingredients().stream() )
                .map( RecipeIngredientModel::allergens )
                .filter( Objects::nonNull )
                .flatMap( Arrays::stream )
                .filter( str -> str != null && !str.isBlank() )
                .collect( Collectors.toMap(
                        String::toLowerCase,
                        allergen -> allergen,
                        ( existing, replacement ) -> existing,
                        LinkedHashMap::new
                ) );
        
        List<String> allergens = uniqueAllergensMap.isEmpty()
                ? null
                : new ArrayList<>( uniqueAllergensMap.values() );
        
        RecipeDetailModel recipe = new RecipeDetailModel(
                idService.randomId(),
                recipeDto.title(),
                ingredientGroupsWithIds,
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
