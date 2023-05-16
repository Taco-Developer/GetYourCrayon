package com.sevenight.coldcrayon.theme.repository;

import java.util.List;

import com.sevenight.coldcrayon.room.entity.RoomHash;
import com.sevenight.coldcrayon.theme.entity.Theme;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThemeRepository extends JpaRepository<Theme, Integer>{

    List<Theme> findAllByTheme(ThemeCategory theme);

}
