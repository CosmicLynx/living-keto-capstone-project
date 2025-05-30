package org.example.backend.recipe.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.recipe.model.RecipeModel;
import org.example.backend.recipe.service.RecipeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipe")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService recipeService;
    
    @GetMapping
    public List<RecipeModel> getAllRecipes() {
        return recipeService.getAllRecipes();
    }
}
