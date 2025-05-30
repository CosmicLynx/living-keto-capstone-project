package org.example.backend.recipe.model;

import java.util.List;

public record StepGroupModel(
        String name,
        List<String> steps ) {
}
