package org.example.backend.recipe.model;

import com.mongodb.lang.Nullable;
import org.springframework.data.mongodb.core.mapping.Field;

public record RecipeIngredientModel(
        @Field("id") String id,
        String name,
        double amount,
        UnitEnum unit,
        NutritionValuesModel nutritionValues,
        boolean isAllergen,
        @Nullable String hint
) {
}
