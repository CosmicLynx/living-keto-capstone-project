package org.example.backend.recipe.service;

import org.example.backend.exceptions.AlreadyExistsException;
import org.example.backend.recipe.model.AllergenModel;
import org.example.backend.recipe.repository.AllergensRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class AllergenServiceTest {
    private final AllergensRepository mockAllergensRepository = Mockito.mock( AllergensRepository.class );
    private final AllergenService allergenService = new AllergenService( mockAllergensRepository );
    
    AllergenModel testAllergen = new AllergenModel( "Test" );
    
    @Test
    void getAllAllergens() {
        Mockito.when( mockAllergensRepository.findAll() ).thenReturn( List.of( testAllergen ) );
        List<AllergenModel> result = allergenService.getAllAllergens();
        assertEquals( List.of( testAllergen ), result );
    }
    
    @Test
    void findAllergens() {
        Mockito.when( mockAllergensRepository.findByAllergenContainingIgnoreCase( "Test" ) ).thenReturn( List.of( testAllergen ) );
        List<AllergenModel> result = allergenService.findAllergens( "Test" );
        assertEquals( List.of( testAllergen ), result );
    }
    
    @Test
    void addAllergen() {
        allergenService.addAllergens( List.of( "Test" ) );
        Mockito.verify( mockAllergensRepository ).save( Mockito.any( AllergenModel.class ) );
    }
    
    @Test
    void addAllergen_alreadyExists() {
        Mockito.when( mockAllergensRepository.findByAllergen( "Test" ) ).thenReturn( Optional.of( testAllergen ) );
        assertThrows( AlreadyExistsException.class, () -> allergenService.addAllergens( List.of( "Test" ) ) );
        Mockito.verify( mockAllergensRepository, Mockito.never() ).save( Mockito.any( AllergenModel.class ) );
    }
    
    @Test
    void deleteAllergen() {
        allergenService.deleteAllergen( "Test" );
        Mockito.verify( mockAllergensRepository ).deleteByAllergen( "Test" );
    }
}