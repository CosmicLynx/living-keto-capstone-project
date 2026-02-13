package org.example.backend.recipe.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.recipe.model.AllergenModel;
import org.example.backend.recipe.repository.AllergensRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
class AllergenControllerTest {
    
    @Autowired
    MockMvc mockMvc;
    
    @Autowired
    AllergensRepository allergensRepository;
    AllergenModel testAllergen = new AllergenModel( "Test" );
    @Autowired
    private ObjectMapper objectMapper;
    
    @BeforeEach
    void setUp() {
        allergensRepository.deleteAll();
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void getAllAllergens() throws Exception {
        allergensRepository.save( testAllergen );
        mockMvc.perform( MockMvcRequestBuilders.get( "/api/allergen" ) )
                .andExpect( MockMvcResultMatchers.status().isOk() )
                .andExpect( MockMvcResultMatchers.content().json( objectMapper.writeValueAsString( List.of( testAllergen ) ) ) );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void searchAllergens_returnsAllergen_withLowerCaseSearch() throws Exception {
        allergensRepository.save( testAllergen );
        mockMvc.perform( MockMvcRequestBuilders.get( "/api/allergen/search/test" ) )
                .andExpect( MockMvcResultMatchers.status().isOk() )
                .andExpect( MockMvcResultMatchers.content().json( objectMapper.writeValueAsString( List.of( testAllergen ) ) ) );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void searchAllergens_returnsAllergen_withPartialSearch() throws Exception {
        allergensRepository.save( testAllergen );
        mockMvc.perform( MockMvcRequestBuilders.get( "/api/allergen/search/tes" ) )
                .andExpect( MockMvcResultMatchers.status().isOk() )
                .andExpect( MockMvcResultMatchers.content().json( objectMapper.writeValueAsString( List.of( testAllergen ) ) ) );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void addAllergens() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders.post( "/api/allergen" )
                        .contentType( MediaType.APPLICATION_JSON )
                        .content( """
                                    ["Test"]
                                """ ) )
                .andExpect( MockMvcResultMatchers.status().isOk() )
                .andExpect( MockMvcResultMatchers.content().json( objectMapper.writeValueAsString( List.of( testAllergen ) ) ) );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void addAllergens_returns400_withEmptyBody() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders.post( "/api/allergen" ) )
                .andExpect( MockMvcResultMatchers.status().isBadRequest() );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void addAllergens_returns409_withExistingAllergen() throws Exception {
        allergensRepository.save( testAllergen );
        mockMvc.perform( MockMvcRequestBuilders.post( "/api/allergen" ).contentType( MediaType.APPLICATION_JSON )
                        .content( """
                                    ["Test"]
                                """ ) )
                .andExpect( MockMvcResultMatchers.status().isConflict() );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void deleteAllergen() throws Exception {
        allergensRepository.save( testAllergen );
        mockMvc.perform( MockMvcRequestBuilders.delete( "/api/allergen/Test" ) )
                .andExpect( MockMvcResultMatchers.status().isOk() );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void deleteAllergen_returns404_withInvalidAllergen() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders.delete( "/api/allergen/Test" ) )
                .andExpect( MockMvcResultMatchers.status().isNotFound() );
    }
}