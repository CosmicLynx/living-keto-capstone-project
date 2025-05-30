package org.example.backend.recipe.model;

public record IngredientModel(
        String id,
        String name,
        double amount,
        UnitEnum unit,
        NutritionValuesModel nutritionValues,
        boolean isAllergen,
        String hint
) {
}
