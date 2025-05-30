package org.example.backend.recipe.model;

import com.mongodb.lang.Nullable;

import java.util.List;

public record RecipeModel(
        String id,
        String title,
        List<IngredientGroupModel> ingredients,
        NutritionValuesModel nutritionValues,
        int totalTime,
        @Nullable List<String> allergens,
        List<String> tags,
        String image
) {
}