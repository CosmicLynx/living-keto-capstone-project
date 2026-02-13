package org.example.backend.recipe.repository;

import org.example.backend.recipe.model.TagModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.*;

public interface TagsRepository extends MongoRepository<TagModel, String> {
    List<TagModel> findByTagContainingIgnoreCase( String tag );
    
    void deleteByTag( String tag );
    
    Optional<Object> findByTag( String tag );
}
