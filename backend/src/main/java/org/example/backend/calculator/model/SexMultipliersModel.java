package org.example.backend.calculator.model;

import lombok.With;
import org.example.backend.calculator.model.enums.SexEnum;
import org.springframework.data.annotation.Id;

@With
public record SexMultipliersModel(
        @Id String id,
        SexEnum sex,
        double weightMultiplier,
        double heightMultiplier,
        double ageMultiplier,
        int subtract
) {
}
