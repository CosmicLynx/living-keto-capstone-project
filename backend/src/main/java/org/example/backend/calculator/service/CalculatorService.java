package org.example.backend.calculator.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.calculator.model.*;
import org.example.backend.calculator.model.calculator.*;
import org.example.backend.calculator.model.values.EditValuesModel;
import org.example.backend.calculator.repository.*;
import org.springframework.stereotype.Service;

import java.math.*;
import java.util.List;

import static java.math.BigDecimal.valueOf;

@Service
@RequiredArgsConstructor
public class CalculatorService {
    private final ActivityLevelRepository activityLevelRepository;
    private final IsBreastfeedingRepository isBreastfeedingRepository;
    private final IsPregnantRepository isPregnantRepository;
    private final SexMultipliersRepository sexMultipliersRepository;
    private final WeightGoalRepository weightGoalRepository;
    
    public CalculatorResponseModel calculate( CalculatorRequestModel requestModel ) {
        ActivityLevelModel activityLevel = activityLevelRepository.findByActivityLevel( requestModel.activityLevel() );
        IsBreastfeedingModel isBreastfeeding = isBreastfeedingRepository.findByIsBreastfeeding( requestModel.isBreastfeeding() );
        IsPregnantModel isPregnant = isPregnantRepository.findByIsPregnant( requestModel.isPregnant() );
        SexMultipliersModel sexMultipliers = sexMultipliersRepository.findBySex( requestModel.sex() );
        WeightGoalModel weightGoal = weightGoalRepository.findByWeightGoal( requestModel.weightGoal() );
        
        BigDecimal baseMetabolicRate =
                (valueOf( sexMultipliers.weightMultiplier() ).multiply( valueOf( requestModel.weight() ) ))
                        .add( valueOf( sexMultipliers.heightMultiplier() ).multiply( valueOf( requestModel.height() ) ) )
                        .subtract( valueOf( sexMultipliers.ageMultiplier() ).multiply( valueOf( requestModel.age() ) ) )
                        .subtract( valueOf( sexMultipliers.subtract() ) )
                        .setScale( 0, RoundingMode.HALF_UP );
        
        BigDecimal totalMetabolicRate =
                (baseMetabolicRate.multiply( valueOf( activityLevel.value() ) ))
                        .add( valueOf( isPregnant.value() ) )
                        .add( valueOf( isBreastfeeding.value() ) )
                        .add( requestModel.dailySport() ? baseMetabolicRate.multiply( valueOf( 0.3 ) ) : BigDecimal.ZERO )
                        .setScale( 0, RoundingMode.HALF_UP );
        
        BigDecimal metabolicTurnover =
                totalMetabolicRate.subtract( baseMetabolicRate )
                        .setScale( 0, RoundingMode.HALF_UP );
        
        BigDecimal goalCalories =
                totalMetabolicRate.multiply( valueOf( weightGoal.value() ) )
                        .setScale( 0, RoundingMode.HALF_UP );
        
        BigDecimal proteinGoal =
                (valueOf( requestModel.height() ).subtract( valueOf( 100 ) ))
                        .multiply( valueOf( requestModel.proteinGoalFactor() ) )
                        .setScale( 0, RoundingMode.HALF_UP );
        
        BigDecimal fatGoal =
                (totalMetabolicRate
                        .subtract( valueOf( requestModel.carbGoal() )
                                .multiply( valueOf( 4.1 ) ) )
                        .subtract( proteinGoal
                                .multiply( valueOf( 4.1 ) ) ))
                        .divide( valueOf( 9.3 ), 2, RoundingMode.HALF_UP )
                        .setScale( 0, RoundingMode.HALF_UP );
        
        return new CalculatorResponseModel(
                baseMetabolicRate,
                totalMetabolicRate,
                metabolicTurnover,
                goalCalories,
                valueOf( requestModel.carbGoal() ),
                proteinGoal,
                fatGoal
        );
    }
    
    public EditValuesModel getEditValues() {
        List<ActivityLevelModel> activityLevel = activityLevelRepository.findAll();
        List<IsBreastfeedingModel> isBreastfeeding = isBreastfeedingRepository.findAll();
        List<IsPregnantModel> isPregnant = isPregnantRepository.findAll();
        List<SexMultipliersModel> sexMultipliers = sexMultipliersRepository.findAll();
        List<WeightGoalModel> weightGoal = weightGoalRepository.findAll();
        
        return new EditValuesModel( sexMultipliers, activityLevel, isBreastfeeding, isPregnant, weightGoal );
    }
    
    public EditValuesModel editValues( EditValuesModel editValuesModel ) {
        for ( ActivityLevelModel activityLevel : editValuesModel.activityLevelValues() ) {
            ActivityLevelModel oldActivityLevel = activityLevelRepository.findByActivityLevel( activityLevel.activityLevel() );
            activityLevelRepository.save( oldActivityLevel.withValue( activityLevel.value() ) );
        }
        for ( IsBreastfeedingModel isBreastfeeding : editValuesModel.breastfeedingValues() ) {
            IsBreastfeedingModel oldIsBreastfeeding = isBreastfeedingRepository.findByIsBreastfeeding( isBreastfeeding.isBreastfeeding() );
            isBreastfeedingRepository.save( oldIsBreastfeeding.withValue( isBreastfeeding.value() ) );
        }
        for ( IsPregnantModel isPregnant : editValuesModel.pregnantValues() ) {
            IsPregnantModel oldIsPregnant = isPregnantRepository.findByIsPregnant( isPregnant.isPregnant() );
            isPregnantRepository.save( oldIsPregnant.withValue( isPregnant.value() ) );
        }
        for ( SexMultipliersModel sexMultipliers : editValuesModel.sexMultipliersValues() ) {
            SexMultipliersModel oldSexMultipliers = sexMultipliersRepository.findBySex( sexMultipliers.sex() );
            sexMultipliersRepository.save( oldSexMultipliers
                    .withAgeMultiplier( sexMultipliers.ageMultiplier() )
                    .withHeightMultiplier( sexMultipliers.heightMultiplier() )
                    .withWeightMultiplier( sexMultipliers.weightMultiplier() )
                    .withSubtract( sexMultipliers.subtract() )
            );
            
        }
        for ( WeightGoalModel weightGoal : editValuesModel.weightGoalValues() ) {
            WeightGoalModel oldWeightGoal = weightGoalRepository.findByWeightGoal( weightGoal.weightGoal() );
            weightGoalRepository.save( oldWeightGoal.withValue( weightGoal.value() ) );
        }
        
        return getEditValues();
    }
    
}
