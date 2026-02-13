package org.example.backend.calculator.model.values;

import org.example.backend.calculator.model.*;

import java.util.List;

public record EditValuesModel(
        List<SexMultipliersModel> sexMultipliersValues,
        List<ActivityLevelModel> activityLevelValues,
        List<IsBreastfeedingModel> breastfeedingValues,
        List<IsPregnantModel> pregnantValues,
        List<WeightGoalModel> weightGoalValues
) {
}
