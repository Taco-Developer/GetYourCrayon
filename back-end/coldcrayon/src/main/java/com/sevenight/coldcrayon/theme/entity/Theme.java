package com.sevenight.coldcrayon.theme.entity;

import javax.persistence.*;

@Entity
public class Theme {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="theme_idx")
    private int themeIdx;

    @Enumerated(EnumType.STRING)
    @Column(name = "theme_category")
    private ThemeCategory theme;

    @Column(name = "theme_keyword")
    private String themeKeyword;

}
