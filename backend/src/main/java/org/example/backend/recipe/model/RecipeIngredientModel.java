package org.example.backend.recipe.model;

import com.mongodb.lang.Nullable;

public record RecipeIngredientModel(
        String id,
        String name,
        double amount,
        UnitEnum unit,
        NutritionValuesModel nutritionValues,
        boolean isAllergen,
        @Nullable String hint
) {
}
