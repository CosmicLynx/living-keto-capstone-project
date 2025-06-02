package org.example.backend.recipe.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.recipe.model.*;
import org.example.backend.recipe.service.RecipeService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/recipe")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService recipeService;
    
    @GetMapping
    public List<RecipeModel> getAllRecipes() {
        return recipeService.getAllRecipes();
    }
    
    @GetMapping("/{id}")
    public RecipeDetailModel getRecipeById( @PathVariable String id ) throws NoSuchElementException {
        return recipeService.getRecipeById( id ).orElseThrow( () -> new NoSuchElementException( "no recipe with id " + id + " found" ) );
    }
}
