package org.example.backend.recipe.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.exceptions.AlreadyExistsException;
import org.example.backend.recipe.model.AllergenModel;
import org.example.backend.recipe.repository.AllergensRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AllergenService {
    private final AllergensRepository allergensRepository;
    
    public List<AllergenModel> getAllAllergens() {
        return allergensRepository.findAll();
    }
    
    public List<AllergenModel> findAllergens( String search ) {
        return allergensRepository.findByAllergenContainingIgnoreCase( search );
    }
    
    public List<AllergenModel> addAllergens( List<String> allergens ) {
        List<AllergenModel> addedAllergens = new ArrayList<>();
        
        for ( String allergen : allergens ) {
            if ( allergensRepository.findByAllergen( allergen ).isPresent() ) {
                throw new AlreadyExistsException( "Allergen '" + allergen + "' existiert bereits" );
            }
            
            AllergenModel newAllergen = new AllergenModel( allergen );
            allergensRepository.save( newAllergen );
            addedAllergens.add( newAllergen );
        }
        
        return addedAllergens;
    }
    
    public void deleteAllergen( String allergen ) {
        allergensRepository.deleteByAllergen( allergen );
    }
}