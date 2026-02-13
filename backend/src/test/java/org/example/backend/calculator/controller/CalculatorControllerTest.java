package org.example.backend.calculator.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.calculator.model.*;
import org.example.backend.calculator.model.calculator.*;
import org.example.backend.calculator.model.enums.*;
import org.example.backend.calculator.model.values.EditValuesModel;
import org.example.backend.calculator.repository.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.math.BigDecimal;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
class CalculatorControllerTest {
    
    @Autowired
    MockMvc mockMvc;
    
    @Autowired
    ActivityLevelRepository activityLevelRepository;
    @Autowired
    IsBreastfeedingRepository isBreastfeedingRepository;
    @Autowired
    IsPregnantRepository isPregnantRepository;
    @Autowired
    SexMultipliersRepository sexMultipliersRepository;
    @Autowired
    WeightGoalRepository weightGoalRepository;
    @Autowired
    CalculatorController calculatorController;
    
    ActivityLevelModel testActivityLevel = new ActivityLevelModel( "1", ActivityLevelEnum.SITTING_MINIMAL_ACTIVITY, 1.4 );
    IsBreastfeedingModel testIsBreastfeeding = new IsBreastfeedingModel( "1", IsBreastfeedingEnum.NO, 0 );
    IsPregnantModel testIsPregnant = new IsPregnantModel( "1", IsPregnantEnum.NO, 0 );
    SexMultipliersModel testSexMultipliers = new SexMultipliersModel( "1", SexEnum.FEMALE, 2.4, 9, 4.7, 65 );
    WeightGoalModel testWeightGoal = new WeightGoalModel( "1", WeightGoalEnum.KEEP_WEIGHT, 1 );
    
    CalculatorRequestModel testRequest = new CalculatorRequestModel(
            SexEnum.FEMALE,
            20,
            70.5,
            169,
            ActivityLevelEnum.SITTING_MINIMAL_ACTIVITY,
            false,
            IsPregnantEnum.NO,
            IsBreastfeedingEnum.NO,
            WeightGoalEnum.KEEP_WEIGHT,
            20,
            1.2
    );
    
    CalculatorResponseModel testResponse = new CalculatorResponseModel(
            new BigDecimal( 1531 ),
            new BigDecimal( 2143 ),
            new BigDecimal( 612 ),
            new BigDecimal( 2143 ),
            new BigDecimal( 20 ),
            new BigDecimal( 83 ),
            new BigDecimal( 185 )
    );
    
    EditValuesModel testValues =
            new EditValuesModel(
                    List.of( testSexMultipliers ),
                    List.of( testActivityLevel ),
                    List.of( testIsBreastfeeding ),
                    List.of( testIsPregnant ),
                    List.of( testWeightGoal )
            );
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @BeforeEach
    void setUp() {
        activityLevelRepository.deleteAll();
        isBreastfeedingRepository.deleteAll();
        isPregnantRepository.deleteAll();
        sexMultipliersRepository.deleteAll();
        weightGoalRepository.deleteAll();
    }
    
    @Test
    void calculate() throws Exception {
        activityLevelRepository.save( testActivityLevel );
        isBreastfeedingRepository.save( testIsBreastfeeding );
        isPregnantRepository.save( testIsPregnant );
        sexMultipliersRepository.save( testSexMultipliers );
        weightGoalRepository.save( testWeightGoal );
        
        mockMvc.perform( MockMvcRequestBuilders.post( "/api/calculator" )
                        .contentType( MediaType.APPLICATION_JSON )
                        .content( objectMapper.writeValueAsString( testRequest ) ) )
                .andExpect( MockMvcResultMatchers.status().isOk() )
                .andExpect( MockMvcResultMatchers.content().json( objectMapper.writeValueAsString( testResponse ) ) );
    }
    
    @Test
    void calculate_returns400_withEmptyBody() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders.post( "/api/calculator" ) )
                .andExpect( MockMvcResultMatchers.status().isBadRequest() );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void getEditValues() throws Exception {
        activityLevelRepository.save( testActivityLevel );
        isBreastfeedingRepository.save( testIsBreastfeeding );
        isPregnantRepository.save( testIsPregnant );
        sexMultipliersRepository.save( testSexMultipliers );
        weightGoalRepository.save( testWeightGoal );
        
        mockMvc.perform( MockMvcRequestBuilders.get( "/api/calculator/values" ) )
                .andExpect( MockMvcResultMatchers.status().isOk() )
                .andExpect( MockMvcResultMatchers.content().json( objectMapper.writeValueAsString( testValues ) ) );
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void editValues() throws Exception {
        activityLevelRepository.save( testActivityLevel );
        isBreastfeedingRepository.save( testIsBreastfeeding );
        isPregnantRepository.save( testIsPregnant );
        sexMultipliersRepository.save( testSexMultipliers );
        weightGoalRepository.save( testWeightGoal );
        
        EditValuesModel newValues = new EditValuesModel(
                List.of( new SexMultipliersModel(
                        "1",
                        testSexMultipliers.sex(),
                        2.5,
                        10,
                        4.7,
                        65 ) ),
                List.of( new ActivityLevelModel( "1", testActivityLevel.activityLevel(), 1.9 ) ),
                List.of( new IsBreastfeedingModel( "1", testIsBreastfeeding.isBreastfeeding(), 3 ) ),
                List.of( new IsPregnantModel( "1", testIsPregnant.isPregnant(), 5 ) ),
                List.of( new WeightGoalModel( "1", testWeightGoal.weightGoal(), 3 ) )
        );
        
        mockMvc.perform( MockMvcRequestBuilders.put( "/api/calculator/values" )
                        .contentType( MediaType.APPLICATION_JSON )
                        .content( objectMapper.writeValueAsString( newValues ) ) )
                .andExpect( MockMvcResultMatchers.status().isOk() );
        
    }
}