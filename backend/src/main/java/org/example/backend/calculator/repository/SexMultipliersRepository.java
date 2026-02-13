package org.example.backend.calculator.repository;

import org.example.backend.calculator.model.SexMultipliersModel;
import org.example.backend.calculator.model.enums.SexEnum;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SexMultipliersRepository extends MongoRepository<SexMultipliersModel, String> {
    SexMultipliersModel findBySex( SexEnum sex );
}
