package com.sevenight.coldcrayon.theme.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
