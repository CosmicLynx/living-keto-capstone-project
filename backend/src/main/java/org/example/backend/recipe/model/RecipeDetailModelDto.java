package org.example.backend.recipe.model;

import java.util.List;

public record RecipeDetailModelDto(
        String title,
        List<IngredientGroupModel> ingredients,
        List<StepGroupModel> steps,
        NutritionValuesModel nutritionValues,
        int preparationTime,
        int cookingTime,
        int defaultPortions,
        List<String> tags,
        String image
) {
}
