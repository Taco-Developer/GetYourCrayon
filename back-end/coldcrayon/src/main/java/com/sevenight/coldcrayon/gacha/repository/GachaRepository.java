package com.sevenight.coldcrayon.gacha.repository;

import com.sevenight.coldcrayon.gacha.dto.GachaDto;
import com.sevenight.coldcrayon.gacha.entity.Gacha;
import com.sevenight.coldcrayon.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GachaRepository extends JpaRepository<Gacha, Long> {
    Optional<Gacha> findByUserIdx(Long userIdx);

    List<Gacha> findAllByUserIdx(User userIdx);
}
