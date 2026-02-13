package org.example.backend.recipe.repository;

import org.example.backend.recipe.model.AllergenModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.*;

public interface AllergensRepository extends MongoRepository<AllergenModel, String> {
    List<AllergenModel> findByAllergenContainingIgnoreCase( String allergen );
    
    void deleteByAllergen( String allergen );
    
    Optional<Object> findByAllergen( String allergen );
}
