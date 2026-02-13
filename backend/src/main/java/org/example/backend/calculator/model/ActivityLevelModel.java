package org.example.backend.calculator.model;

import lombok.With;
import org.example.backend.calculator.model.enums.ActivityLevelEnum;
import org.springframework.data.annotation.Id;

@With
public record ActivityLevelModel(
        @Id String id,
        ActivityLevelEnum activityLevel,
        double value
) {
}
