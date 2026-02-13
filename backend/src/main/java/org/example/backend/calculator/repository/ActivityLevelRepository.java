package org.example.backend.calculator.repository;

import org.example.backend.calculator.model.ActivityLevelModel;
import org.example.backend.calculator.model.enums.ActivityLevelEnum;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActivityLevelRepository extends MongoRepository<ActivityLevelModel, String> {
    ActivityLevelModel findByActivityLevel( ActivityLevelEnum activityLevel );
}
