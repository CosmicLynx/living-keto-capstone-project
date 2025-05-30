package org.example.backend.recipe.model;

import java.time.LocalDateTime;
import java.util.*;

public record RecipeDetailModel(
        String _id,
        String title,
        List<IngredientGroupModel> ingredients,
        List<StepGroupModel> steps,
        NutritionValuesModel nutritionValues,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        int preparationTime,
        int cookingTime,
        int totalTime,
        int defaultPortions,
        Optional<List<String>> allergens,
        List<String> tags,
        String image
) {
}