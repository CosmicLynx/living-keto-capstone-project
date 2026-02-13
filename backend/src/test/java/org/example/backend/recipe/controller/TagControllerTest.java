package org.example.backend.recipe.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.recipe.model.TagModel;
import org.example.backend.recipe.repository.TagsRepository;
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
class TagControllerTest {
    
    @Autowired
    MockMvc mockMvc;
    
    @Autowired
    TagsRepository tagsRepository;
    TagModel testTag = new TagModel( "Test" );
    @Autowired
    private ObjectMapper objectMapper;
    
    @BeforeEach
    void setUp() {
        tagsRepository.deleteAll();
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void getAllTags() throws Exception {
        tagsRepository.save( testTag );
        mockMvc.perform( MockMvcRequestBuilders.get( "/api/tag" ) )
                .andExpect( MockMvcResultMatchers.status().isOk() )
                .andExpect( MockMvcResultMatchers.content().json( objectMapper.writeValueAsString( List.of( testTag ) ) ) );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void searchTags_returnsTag_withLowerCaseSearch() throws Exception {
        tagsRepository.save( testTag );
        mockMvc.perform( MockMvcRequestBuilders.get( "/api/tag/search/test" ) )
                .andExpect( MockMvcResultMatchers.status().isOk() )
                .andExpect( MockMvcResultMatchers.content().json( objectMapper.writeValueAsString( List.of( testTag ) ) ) );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void searchTags_returnsTag_withPartialSearch() throws Exception {
        tagsRepository.save( testTag );
        mockMvc.perform( MockMvcRequestBuilders.get( "/api/tag/search/tes" ) )
                .andExpect( MockMvcResultMatchers.status().isOk() )
                .andExpect( MockMvcResultMatchers.content().json( objectMapper.writeValueAsString( List.of( testTag ) ) ) );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void addTags() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders.post( "/api/tag" )
                        .contentType( MediaType.APPLICATION_JSON )
                        .content( """
                                    ["Test"]
                                """ ) )
                .andExpect( MockMvcResultMatchers.status().isOk() )
                .andExpect( MockMvcResultMatchers.content().json( objectMapper.writeValueAsString( List.of( testTag ) ) ) );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void addTags_returns400_withEmptyBody() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders.post( "/api/tag" ) )
                .andExpect( MockMvcResultMatchers.status().isBadRequest() );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void addTags_returns409_withExistingTag() throws Exception {
        tagsRepository.save( testTag );
        mockMvc.perform( MockMvcRequestBuilders.post( "/api/tag" ).contentType( MediaType.APPLICATION_JSON )
                        .content( """
                                    ["Test"]
                                """ ) )
                .andExpect( MockMvcResultMatchers.status().isConflict() );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void deleteTag() throws Exception {
        tagsRepository.save( testTag );
        mockMvc.perform( MockMvcRequestBuilders.delete( "/api/tag/Test" ) )
                .andExpect( MockMvcResultMatchers.status().isOk() );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void deleteTag_returns404_withInvalidTag() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders.delete( "/api/tag/Test" ) )
                .andExpect( MockMvcResultMatchers.status().isNotFound() );
    }
}