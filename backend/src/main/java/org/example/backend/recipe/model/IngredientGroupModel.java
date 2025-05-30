package org.example.backend.recipe.model;

import java.util.List;

public record IngredientGroupModel(
        String name,
        List<RecipeIngredientModel> ingredients
) {
}
