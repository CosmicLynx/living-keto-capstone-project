package org.example.backend.recipe.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.recipe.model.AllergenModel;
import org.example.backend.recipe.service.AllergenService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/allergen")
@RequiredArgsConstructor
public class AllergenController {
    private final AllergenService allergenService;
    
    @GetMapping
    public List<AllergenModel> getAllAllergens() {
        return allergenService.getAllAllergens();
    }
    
    @GetMapping("/search/{search}")
    public List<AllergenModel> searchAllergens( @PathVariable String search ) {
        return allergenService.findAllergens( search );
    }
    
    @PostMapping
    public List<AllergenModel> addAllergens( @RequestBody List<String> allergens ) {
        return allergenService.addAllergens( allergens );
    }
    
    @DeleteMapping("/{allergen}")
    public void deleteAllergen( @PathVariable String allergen ) throws NoSuchElementException {
        if ( allergenService.findAllergens( allergen ).isEmpty() ) {
            throw new NoSuchElementException( "allergen '" + allergen + "' not found" );
        } else allergenService.deleteAllergen( allergen );
    }
}
