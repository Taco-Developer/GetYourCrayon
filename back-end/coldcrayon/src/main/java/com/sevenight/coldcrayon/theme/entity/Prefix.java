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
public class Prefix {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prefix_id")
    private Integer suffixIdx;

    @Column(name = "prefix")
    private String suffix;

}
