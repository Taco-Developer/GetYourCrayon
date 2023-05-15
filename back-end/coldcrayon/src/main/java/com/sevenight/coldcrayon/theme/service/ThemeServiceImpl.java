package com.sevenight.coldcrayon.theme.service;

import com.sevenight.coldcrayon.theme.entity.QTheme;
import com.sevenight.coldcrayon.theme.entity.Suffix;
import com.sevenight.coldcrayon.theme.entity.Theme;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import com.sevenight.coldcrayon.theme.repository.SuffixRepository;
import com.sevenight.coldcrayon.theme.repository.ThemeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ThemeServiceImpl implements ThemeService {

    private final ThemeRepository themeRepository;
    private final SuffixRepository suffixRepository;
    private final Random random = new Random();

    @Override
    public String getThemeKeyword(ThemeCategory themeCategory) {
        List<Theme> themeList = themeRepository.findAllByTheme(themeCategory);
        List<Suffix> suffixList = suffixRepository.findAll();
        String suffix = suffixList.get(random.nextInt(suffixList.size())).getSuffix();
        String themeKeyword = themeList.get(random.nextInt(themeList.size())).getThemeKeyword();
        return themeKeyword + suffix;
    }
}
