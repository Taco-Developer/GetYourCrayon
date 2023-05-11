package com.sevenight.coldcrayon.theme.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Suffix {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "suffix_idx")
    private Integer suffixIdx;

    @Column(name = "suffix")
    private String suffix;
}