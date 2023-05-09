package com.sevenight.coldcrayon.game.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sevenight.coldcrayon.game.entity.Game;

public interface GameRepository extends JpaRepository<Game, Integer>{
}
