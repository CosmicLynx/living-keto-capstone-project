package org.example.backend.recipe.model.fatsecret;

public record FatsecretIngredientDetailModel(
        String food_id,
        String food_name,
        FatsecretServingsModel servings
) {
}
