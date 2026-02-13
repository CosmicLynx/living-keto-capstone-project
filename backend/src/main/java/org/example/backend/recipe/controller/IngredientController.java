package org.example.backend.recipe.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.recipe.model.IngredientModel;
import org.example.backend.recipe.model.fatsecret.*;
import org.example.backend.recipe.service.IngredientService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredient")
@RequiredArgsConstructor
public class IngredientController {
    private final IngredientService ingredientService;
    
    @GetMapping("/new/{search}")
    public FatsecretFoodsModel searchNewIngredients( @PathVariable String search ) {
        return ingredientService.searchNewIngredients( search );
    }
    
    @GetMapping("/new/id")
    public FatsecretIngredientDetailResponseModel newIngredientDetails( @RequestParam String id ) {
        return ingredientService.newIngredientDetails( id );
    }
    
    @GetMapping("/search/{search}")
    public List<IngredientModel> searchIngredients( @PathVariable String search ) {
        return ingredientService.searchIngredients( search );
    }
    
    @PostMapping("/new")
    public IngredientModel addIngredient( @RequestBody IngredientModel ingredientModel ) {
        return ingredientService.addIngredient( ingredientModel );
    }
}
