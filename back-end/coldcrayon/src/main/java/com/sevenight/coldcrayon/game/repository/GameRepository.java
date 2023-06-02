package com.sevenight.coldcrayon.game.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sevenight.coldcrayon.game.entity.Game;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer>,
        QuerydslPredicateExecutor<Game> {

}

