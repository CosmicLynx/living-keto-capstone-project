package org.example.backend.calculator.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.calculator.model.calculator.*;
import org.example.backend.calculator.model.values.EditValuesModel;
import org.example.backend.calculator.service.CalculatorService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculator")
@RequiredArgsConstructor
public class CalculatorController {
    private final CalculatorService calculatorService;
    
    @PostMapping
    public CalculatorResponseModel calculate( @RequestBody CalculatorRequestModel request ) {
        return calculatorService.calculate( request );
    }
    
    @GetMapping("/values")
    public EditValuesModel getEditValues() {
        return calculatorService.getEditValues();
    }
    
    @PutMapping("/values")
    public EditValuesModel editValues( @RequestBody EditValuesModel editValuesModel ) {
        return calculatorService.editValues( editValuesModel );
    }
}
