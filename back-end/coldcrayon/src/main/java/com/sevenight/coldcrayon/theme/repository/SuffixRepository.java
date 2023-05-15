package com.sevenight.coldcrayon.theme.repository;

import com.sevenight.coldcrayon.theme.entity.Suffix;
import com.sevenight.coldcrayon.theme.entity.Theme;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuffixRepository extends JpaRepository<Suffix, Integer>{
}
