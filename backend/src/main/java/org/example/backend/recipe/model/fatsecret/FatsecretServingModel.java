package org.example.backend.recipe.model.fatsecret;

public record FatsecretServingModel(
        String serving_id,
        String serving_description,
        String metric_serving_amount,
        String metric_serving_unit,
        String calories,
        String carbohydrate,
        String protein,
        String fat
) {
}
