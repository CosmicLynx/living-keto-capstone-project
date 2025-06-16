package org.example.backend.recipe.service;

import org.example.backend.recipe.model.IngredientModel;
import org.example.backend.recipe.repository.IngredientRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class IngredientServiceTest {
    
    private final IngredientRepository mockIngredientRepository = Mockito.mock( IngredientRepository.class );
    private final IngredientService ingredientService = new IngredientService( mockIngredientRepository, null );
    
    @Test
    void searchIngredients() {
        String searchQuery = "Tomato";
        IngredientModel ingredient = new IngredientModel( "1", "Tomato", List.of(), null );
        Mockito.when( mockIngredientRepository.findByName( searchQuery ) ).thenReturn( List.of( ingredient ) );
        
        List<IngredientModel> result = ingredientService.searchIngredients( searchQuery );
        
        Mockito.verify( mockIngredientRepository ).findByName( searchQuery );
        assertEquals( 1, result.size() );
        assertEquals( "Tomato", result.getFirst().name() );
    }
    
    @Test
    void addIngredient() {
        IngredientModel ingredient = new IngredientModel( "1", "Salt", List.of(), null );
        Mockito.when( mockIngredientRepository.save( ingredient ) ).thenReturn( ingredient );
        
        IngredientModel result = ingredientService.addIngredient( ingredient );
        
        Mockito.verify( mockIngredientRepository ).save( ingredient );
        assertEquals( "Salt", result.name() );
        assertEquals( "1", result.id() );
    }
}