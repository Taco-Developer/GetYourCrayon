package com.sevenight.coldcrayon.auth.repository;

import com.sevenight.coldcrayon.auth.entity.RedisEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedisRepository extends CrudRepository<RedisEntity, String> {
//    Optional<RedisEntity> findByValue(String value);
}
