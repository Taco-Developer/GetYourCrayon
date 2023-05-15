package com.sevenight.coldcrayon.room.repository;

import com.sevenight.coldcrayon.room.entity.UserHash;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserHashRepository extends CrudRepository<UserHash, Long>{
}
