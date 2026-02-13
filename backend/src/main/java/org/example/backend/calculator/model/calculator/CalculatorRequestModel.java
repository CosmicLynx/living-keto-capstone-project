package org.example.backend.calculator.model.calculator;

import org.example.backend.calculator.model.enums.*;

public record CalculatorRequestModel(
        SexEnum sex,
        int age,
        double weight,
        int height,
        ActivityLevelEnum activityLevel,
        boolean dailySport,
        IsPregnantEnum isPregnant,
        IsBreastfeedingEnum isBreastfeeding,
        WeightGoalEnum weightGoal,
        int carbGoal,
        double proteinGoalFactor
) {
}
