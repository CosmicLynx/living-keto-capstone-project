package org.example.backend.recipe.service;

import org.example.backend.recipe.model.IngredientModel;
import org.example.backend.recipe.model.fatsecret.*;
import org.example.backend.recipe.repository.IngredientRepository;
import org.example.backend.restclient.RestClientConfig;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {
    
    private final IngredientRepository ingredientRepository;
    private final RestClientConfig restClient;
    
    public IngredientService( IngredientRepository ingredientRepository, RestClientConfig restClient ) {
        this.ingredientRepository = ingredientRepository;
        this.restClient = restClient;
    }
    
    public List<IngredientModel> searchIngredients( String search ) {
        return ingredientRepository.findByNameContainingIgnoreCase( search );
    }
    
    public FatsecretFoodsModel searchNewIngredients( String search ) {
        
        return restClient.restClient().get()
                .uri( "foods/search/v1?format=json&search_expression=" + search )
                .retrieve()
                .body( FatsecretFoodsModel.class );
    }
    
    public FatsecretIngredientDetailResponseModel newIngredientDetails( String id ) {
        return restClient.restClient().get()
                .uri( "food/v4?format=json&food_id=" + id )
                .retrieve()
                .body( FatsecretIngredientDetailResponseModel.class );
    }
    
    public IngredientModel addIngredient( IngredientModel ingredientModel ) {
        return ingredientRepository.save( ingredientModel );
    }
    
}
