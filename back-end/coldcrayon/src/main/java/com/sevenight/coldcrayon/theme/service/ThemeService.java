package com.sevenight.coldcrayon.theme.service;

import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ThemeService {
    List<String> getThemeKeyword(ThemeCategory themeCategory);
}
