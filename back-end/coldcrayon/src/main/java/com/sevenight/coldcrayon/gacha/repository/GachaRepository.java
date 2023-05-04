package com.sevenight.coldcrayon.gacha.repository;

import com.sevenight.coldcrayon.gacha.entity.Gacha;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GachaRepository extends JpaRepository<Gacha, String> {
    Optional<Gacha> findByUserIdx(Long userIdx);
}
