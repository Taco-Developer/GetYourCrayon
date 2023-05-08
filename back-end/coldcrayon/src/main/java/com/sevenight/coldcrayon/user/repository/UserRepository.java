package com.sevenight.coldcrayon.user.repository;

import com.sevenight.coldcrayon.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUserNickname(String userNickname);

    Optional<User> findByUserIdx(Long userIdx);
}
