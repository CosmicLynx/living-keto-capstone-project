package org.example.backend.recipe.service;

import org.example.backend.exceptions.AlreadyExistsException;
import org.example.backend.recipe.model.TagModel;
import org.example.backend.recipe.repository.TagsRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class TagServiceTest {
    private final TagsRepository mockTagsRepository = Mockito.mock( TagsRepository.class );
    private final TagService tagService = new TagService( mockTagsRepository );
    
    TagModel testTag = new TagModel( "Test" );
    
    @Test
    void getAllTags() {
        Mockito.when( mockTagsRepository.findAll() ).thenReturn( List.of( testTag ) );
        List<TagModel> result = tagService.getAllTags();
        assertEquals( List.of( testTag ), result );
    }
    
    @Test
    void findTags() {
        Mockito.when( mockTagsRepository.findByTagContainingIgnoreCase( "Test" ) ).thenReturn( List.of( testTag ) );
        List<TagModel> result = tagService.findTags( "Test" );
        assertEquals( List.of( testTag ), result );
    }
    
    @Test
    void addTags() {
        tagService.addTags( List.of( "Test" ) );
        Mockito.verify( mockTagsRepository ).save( Mockito.any( TagModel.class ) );
    }
    
    @Test
    void addTags_alreadyExists() {
        Mockito.when( mockTagsRepository.findByTag( "Test" ) ).thenReturn( Optional.of( testTag ) );
        assertThrows( AlreadyExistsException.class, () -> tagService.addTags( List.of( "Test" ) ) );
        Mockito.verify( mockTagsRepository, Mockito.never() ).save( Mockito.any( TagModel.class ) );
    }
    
    @Test
    void deleteTag() {
        tagService.deleteTag( "Test" );
        Mockito.verify( mockTagsRepository ).deleteByTag( "Test" );
    }
}