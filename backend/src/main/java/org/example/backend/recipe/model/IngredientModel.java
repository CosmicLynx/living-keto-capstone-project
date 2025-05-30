package org.example.backend.recipe.model;

import java.util.List;

public record IngredientModel(
        String id,
        String name,
        List<UnitEnum> units,
        NutritionValuesModel nutritionValues,
        boolean isAllergen
) {
}
