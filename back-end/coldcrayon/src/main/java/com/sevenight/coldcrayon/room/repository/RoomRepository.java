package com.sevenight.coldcrayon.room.repository;

import com.sevenight.coldcrayon.room.entity.RoomHash;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends CrudRepository<RoomHash, String> {

}
