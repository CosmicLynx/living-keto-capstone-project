package org.example.backend.recipe.model;

import java.util.Optional;

public record NutritionValuesModel(
        int fat,
        int protein,
        int carbs,
        int calories,
        Optional<Double> skaldeman ) {
}
