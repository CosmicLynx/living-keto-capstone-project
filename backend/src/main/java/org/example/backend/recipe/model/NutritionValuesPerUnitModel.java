package org.example.backend.recipe.model;

public record NutritionValuesPerUnitModel(
        double defaultAmount,
        String unit,
        NutritionValuesModel nutritionValues
) {
}
