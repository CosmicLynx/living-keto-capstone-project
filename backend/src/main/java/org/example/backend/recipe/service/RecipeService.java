package org.example.backend.recipe.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.recipe.model.*;
import org.example.backend.recipe.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RecipeService {
    
    private final RecipeRepository recipeRepository;
    
    public List<RecipeModel> getAllRecipes() {
        List<RecipeDetailModel> foundRecipes = recipeRepository.findAll();
        List<RecipeModel> reducedRecipes = new ArrayList<>();
        for ( RecipeDetailModel recipe : foundRecipes ) {
            reducedRecipes.add( new RecipeModel(
                    recipe._id(),
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
}
