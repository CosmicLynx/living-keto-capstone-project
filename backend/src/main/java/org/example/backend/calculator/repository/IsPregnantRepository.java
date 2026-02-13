package org.example.backend.calculator.repository;

import org.example.backend.calculator.model.IsPregnantModel;
import org.example.backend.calculator.model.enums.IsPregnantEnum;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IsPregnantRepository extends MongoRepository<IsPregnantModel, String> {
    IsPregnantModel findByIsPregnant( IsPregnantEnum isPregnant );
}
