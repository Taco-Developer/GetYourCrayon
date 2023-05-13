package com.sevenight.coldcrayon.theme.service;

import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import org.springframework.stereotype.Service;

public interface ThemeService {
    String getThemeKeyword(ThemeCategory themeCategory);
}
