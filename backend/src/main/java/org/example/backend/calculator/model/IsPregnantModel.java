package org.example.backend.calculator.model;

import lombok.With;
import org.example.backend.calculator.model.enums.IsPregnantEnum;
import org.springframework.data.annotation.Id;

@With
public record IsPregnantModel(
        @Id String id,
        IsPregnantEnum isPregnant,
        int value
) {
}
