package org.example.backend.recipe.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.recipe.model.RecipeModel;
import org.example.backend.recipe.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {
    
    private final RecipeRepository recipeRepository;
    
    public List<RecipeModel> getAllRecipes() {
        return recipeRepository.findAll();
    }
}
