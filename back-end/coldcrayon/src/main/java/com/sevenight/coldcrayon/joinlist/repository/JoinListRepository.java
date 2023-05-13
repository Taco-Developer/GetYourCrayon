package com.sevenight.coldcrayon.joinlist.repository;

import com.sevenight.coldcrayon.joinlist.entity.Joinlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JoinListRepository extends JpaRepository<Joinlist, Integer> {
}
