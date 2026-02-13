package org.example.backend.recipe.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.exceptions.AlreadyExistsException;
import org.example.backend.recipe.model.TagModel;
import org.example.backend.recipe.repository.TagsRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagsRepository tagsRepository;
    
    public List<TagModel> getAllTags() {
        return tagsRepository.findAll();
    }
    
    public List<TagModel> findTags( String search ) {
        return tagsRepository.findByTagContainingIgnoreCase( search );
    }
    
    public List<TagModel> addTags( List<String> tags ) {
        List<TagModel> addedTags = new ArrayList<>();
        for ( String tag : tags ) {
            if ( tagsRepository.findByTag( tag ).isPresent() ) {
                throw new AlreadyExistsException( "Tag '" + tag + "' existiert bereits" );
            }
            TagModel newTag = new TagModel( tag );
            tagsRepository.save( newTag );
            addedTags.add( newTag );
        }
        return addedTags;
    }
    
    public void deleteTag( String tag ) {
        tagsRepository.deleteByTag( tag );
    }
}