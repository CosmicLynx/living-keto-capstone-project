package org.example.backend.calculator.model.calculator;

import java.math.BigDecimal;

public record CalculatorResponseModel(
        BigDecimal baseMetabolicRate,
        BigDecimal totalMetabolicRate,
        BigDecimal metabolicTurnover,
        BigDecimal goalCalories,
        BigDecimal carbGoal,
        BigDecimal proteinGoal,
        BigDecimal fatGoal
) {
}
