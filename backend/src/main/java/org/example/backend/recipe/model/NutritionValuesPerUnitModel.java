package org.example.backend.recipe.model;

public record NutritionValuesPerUnitModel(
        double defaultAmount,
        UnitEnum unit,
        NutritionValuesModel nutritionValues
) {
}
