package org.example.backend.recipe.model;

import com.mongodb.lang.Nullable;
import lombok.With;

import java.util.List;

@With
public record IngredientModel(
        String id,
        String name,
        List<NutritionValuesPerUnitModel> nutritionValuesPerUnit,
        @Nullable String[] allergens
) {
}
