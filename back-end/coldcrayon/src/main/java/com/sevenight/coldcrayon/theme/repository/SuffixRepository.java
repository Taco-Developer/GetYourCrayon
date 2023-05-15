package com.sevenight.coldcrayon.theme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sevenight.coldcrayon.theme.entity.Suffix;

@Repository
public interface SuffixRepository extends JpaRepository<Suffix, Integer> {

}
