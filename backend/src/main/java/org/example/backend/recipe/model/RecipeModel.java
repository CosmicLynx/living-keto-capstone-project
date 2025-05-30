package org.example.backend.recipe.model;

import java.util.*;

public record RecipeModel(
        String title,
        String id,
        List<IngredientModel> ingredients,
        NutritionValuesModel nutritionValues,
        int totalTime,
        Optional<List<String>> allergens,
        List<String> tags,
        String image
) {
}