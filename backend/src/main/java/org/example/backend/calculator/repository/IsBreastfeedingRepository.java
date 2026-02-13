package org.example.backend.calculator.repository;

import org.example.backend.calculator.model.IsBreastfeedingModel;
import org.example.backend.calculator.model.enums.IsBreastfeedingEnum;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IsBreastfeedingRepository extends MongoRepository<IsBreastfeedingModel, String> {
    IsBreastfeedingModel findByIsBreastfeeding( IsBreastfeedingEnum isBreastfeeding );
}
