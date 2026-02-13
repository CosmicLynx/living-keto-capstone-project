package org.example.backend.recipe.model;

import com.mongodb.lang.Nullable;

public record NutritionValuesModel(
        int fat,
        int protein,
        int carbs,
        int calories,
        @Nullable Double skaldeman ) {
}
