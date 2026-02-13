package org.example.backend.recipe.model.fatsecret;

import java.util.List;

public record FatsecretAllergensModel(
        List<FatsecretAllergenModel> allergen
) {
}
