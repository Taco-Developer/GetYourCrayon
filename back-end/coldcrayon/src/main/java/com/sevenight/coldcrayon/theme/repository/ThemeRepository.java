package com.sevenight.coldcrayon.theme.repository;

import com.sevenight.coldcrayon.room.entity.RoomHash;
import com.sevenight.coldcrayon.theme.entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThemeRepository extends JpaRepository<Theme, Integer> {
}
