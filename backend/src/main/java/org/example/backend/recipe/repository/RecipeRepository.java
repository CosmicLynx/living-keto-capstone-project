package org.example.backend.recipe.repository;

import org.example.backend.recipe.model.RecipeDetailModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends MongoRepository<RecipeDetailModel, String> {
}
