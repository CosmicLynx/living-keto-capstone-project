package org.example.backend.calculator.model;

import lombok.With;
import org.example.backend.calculator.model.enums.WeightGoalEnum;
import org.springframework.data.annotation.Id;

@With
public record WeightGoalModel(
        @Id String id,
        WeightGoalEnum weightGoal,
        double value
) {
}
