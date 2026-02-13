package org.example.backend.recipe.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.recipe.model.TagModel;
import org.example.backend.recipe.service.TagService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/tag")
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;
    
    @GetMapping
    public List<TagModel> getAllTags() {
        return tagService.getAllTags();
    }
    
    @GetMapping("/search/{search}")
    public List<TagModel> searchTags( @PathVariable String search ) {
        return tagService.findTags( search );
    }
    
    @PostMapping
    public List<TagModel> addTags( @RequestBody List<String> tags ) {
        return tagService.addTags( tags );
    }
    
    @DeleteMapping("/{tag}")
    public void deleteTag( @PathVariable String tag ) throws NoSuchElementException {
        if ( tagService.findTags( tag ).isEmpty() ) {
            throw new NoSuchElementException( "tag '" + tag + "' not found" );
        } else tagService.deleteTag( tag );
    }
}
