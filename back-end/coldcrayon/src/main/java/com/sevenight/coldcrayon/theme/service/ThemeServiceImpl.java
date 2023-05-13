package com.sevenight.coldcrayon.theme.service;

import com.sevenight.coldcrayon.theme.entity.QTheme;
import com.sevenight.coldcrayon.theme.entity.Theme;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import com.sevenight.coldcrayon.theme.repository.ThemeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class ThemeServiceImpl implements ThemeService {

    private final ThemeRepository themeRepository;
    private final Random random = new Random();

    @Override
    public String getThemeKeyword(ThemeCategory themeCategory) {
        Theme theme = themeRepository.findRandom1ByTheme(themeCategory);
        return theme.getThemeKeyword();
    }
}
