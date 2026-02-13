package org.example.backend.calculator.service;

import org.example.backend.calculator.model.*;
import org.example.backend.calculator.model.calculator.*;
import org.example.backend.calculator.model.enums.*;
import org.example.backend.calculator.model.values.EditValuesModel;
import org.example.backend.calculator.repository.*;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CalculatorServiceTest {
    private final ActivityLevelRepository activityLevelRepository = mock( ActivityLevelRepository.class );
    private final IsBreastfeedingRepository isBreastfeedingRepository = mock( IsBreastfeedingRepository.class );
    private final IsPregnantRepository isPregnantRepository = mock( IsPregnantRepository.class );
    private final SexMultipliersRepository sexMultipliersRepository = mock( SexMultipliersRepository.class );
    private final WeightGoalRepository weightGoalRepository = mock( WeightGoalRepository.class );
    
    private final CalculatorService calculatorService = new CalculatorService( activityLevelRepository, isBreastfeedingRepository, isPregnantRepository, sexMultipliersRepository, weightGoalRepository );
    ActivityLevelModel activityLevel = new ActivityLevelModel( "1", ActivityLevelEnum.SITTING_MINIMAL_ACTIVITY, 1.4 );
    IsBreastfeedingModel breastfeeding = new IsBreastfeedingModel( "1", IsBreastfeedingEnum.NO, 0 );
    IsPregnantModel pregnant = new IsPregnantModel( "1", IsPregnantEnum.NO, 0 );
    SexMultipliersModel sexMultipliers = new SexMultipliersModel( "1", SexEnum.FEMALE, 2.4, 9, 4.7, 65 );
    WeightGoalModel weightGoal = new WeightGoalModel( "1", WeightGoalEnum.KEEP_WEIGHT, 1 );
    
    EditValuesModel testEditValues =
            new EditValuesModel(
                    List.of( sexMultipliers ),
                    List.of( activityLevel ),
                    List.of( breastfeeding ),
                    List.of( pregnant ),
                    List.of( weightGoal )
            );
    
    @Test
    void calculate() {
        when( activityLevelRepository.findByActivityLevel( ActivityLevelEnum.SITTING_MINIMAL_ACTIVITY ) ).thenReturn( activityLevel );
        when( isBreastfeedingRepository.findByIsBreastfeeding( IsBreastfeedingEnum.NO ) ).thenReturn( breastfeeding );
        when( isPregnantRepository.findByIsPregnant( IsPregnantEnum.NO ) ).thenReturn( pregnant );
        when( sexMultipliersRepository.findBySex( SexEnum.FEMALE ) ).thenReturn( sexMultipliers );
        when( weightGoalRepository.findByWeightGoal( WeightGoalEnum.KEEP_WEIGHT ) ).thenReturn( weightGoal );
        
        CalculatorRequestModel request = new CalculatorRequestModel(
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
        
        CalculatorResponseModel result = calculatorService.calculate( request );
        
        assertEquals( new BigDecimal( "1531" ), result.baseMetabolicRate() );
        assertEquals( new BigDecimal( "2143" ), result.totalMetabolicRate() );
        assertEquals( new BigDecimal( "612" ), result.metabolicTurnover() );
        assertEquals( new BigDecimal( "2143" ), result.goalCalories() );
        assertEquals( new BigDecimal( "20" ), result.carbGoal() );
        assertEquals( new BigDecimal( "83" ), result.proteinGoal() );
        assertEquals( new BigDecimal( "185" ), result.fatGoal() );
    }
    
    @Test
    void getEditValues() {
        when( activityLevelRepository.findAll() ).thenReturn( List.of( activityLevel ) );
        when( sexMultipliersRepository.findAll() ).thenReturn( List.of( sexMultipliers ) );
        when( isBreastfeedingRepository.findAll() ).thenReturn( List.of( breastfeeding ) );
        when( isPregnantRepository.findAll() ).thenReturn( List.of( pregnant ) );
        when( weightGoalRepository.findAll() ).thenReturn( List.of( weightGoal ) );
        
        EditValuesModel result = calculatorService.getEditValues();
        assertEquals( testEditValues, result );
    }
    
    @Test
    void editValues() {
        when( activityLevelRepository.findByActivityLevel( activityLevel.activityLevel() ) ).thenReturn( activityLevel );
        when( isBreastfeedingRepository.findByIsBreastfeeding( breastfeeding.isBreastfeeding() ) ).thenReturn( breastfeeding );
        when( isPregnantRepository.findByIsPregnant( pregnant.isPregnant() ) ).thenReturn( pregnant );
        when( sexMultipliersRepository.findBySex( sexMultipliers.sex() ) ).thenReturn( sexMultipliers );
        when( weightGoalRepository.findByWeightGoal( weightGoal.weightGoal() ) ).thenReturn( weightGoal );
        
        EditValuesModel newValues =
                new EditValuesModel(
                        List.of(
                                new SexMultipliersModel(
                                        "1",
                                        sexMultipliers.sex(),
                                        2.5,
                                        10,
                                        4.7,
                                        65
                                )
                        ),
                        List.of( new ActivityLevelModel(
                                        "1",
                                        activityLevel.activityLevel(),
                                        1.9
                                )
                        ),
                        List.of( new IsBreastfeedingModel(
                                        "1",
                                        breastfeeding.isBreastfeeding(),
                                        3
                                )
                        ),
                        List.of( new IsPregnantModel(
                                        "1",
                                        pregnant.isPregnant(),
                                        5
                                )
                        ),
                        List.of( new WeightGoalModel(
                                        "1",
                                        weightGoal.weightGoal(),
                                        3
                                )
                        )
                );
        
        calculatorService.editValues( newValues );
        verify( activityLevelRepository ).save( activityLevel.withValue( 1.9 ) );
        verify( sexMultipliersRepository ).save( sexMultipliers
                .withAgeMultiplier( 4.7 )
                .withHeightMultiplier( 10 )
                .withWeightMultiplier( 2.5 )
                .withSubtract( 65 )
        );
        verify( isBreastfeedingRepository ).save( breastfeeding.withValue( 3 ) );
        verify( isPregnantRepository ).save( pregnant.withValue( 5 ) );
        verify( weightGoalRepository ).save( weightGoal.withValue( 3 ) );
    }
}