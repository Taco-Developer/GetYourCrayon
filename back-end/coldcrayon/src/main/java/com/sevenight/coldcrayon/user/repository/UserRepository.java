package com.sevenight.coldcrayon.user.repository;

import com.sevenight.coldcrayon.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
