package org.example.backend.calculator.repository;

import org.example.backend.calculator.model.WeightGoalModel;
import org.example.backend.calculator.model.enums.WeightGoalEnum;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WeightGoalRepository extends MongoRepository<WeightGoalModel, String> {
    WeightGoalModel findByWeightGoal( WeightGoalEnum weightGoal );
}
