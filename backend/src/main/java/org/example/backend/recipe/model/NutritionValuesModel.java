package org.example.backend.recipe.model;

import com.mongodb.lang.Nullable;

public record NutritionValuesModel(
        double fat,
        double protein,
        double carbs,
        double calories,
        @Nullable Double skaldeman ) {
}
