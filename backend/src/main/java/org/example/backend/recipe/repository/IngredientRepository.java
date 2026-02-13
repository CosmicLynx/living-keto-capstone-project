package org.example.backend.recipe.repository;

import org.example.backend.recipe.model.IngredientModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface IngredientRepository extends MongoRepository<IngredientModel, String> {
    List<IngredientModel> findByNameContainingIgnoreCase( String name );
}
