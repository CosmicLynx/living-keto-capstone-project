package org.example.backend.calculator.model;

import lombok.With;
import org.example.backend.calculator.model.enums.IsBreastfeedingEnum;
import org.springframework.data.annotation.Id;

@With
public record IsBreastfeedingModel(
        @Id String id,
        IsBreastfeedingEnum isBreastfeeding,
        int value
) {
}
