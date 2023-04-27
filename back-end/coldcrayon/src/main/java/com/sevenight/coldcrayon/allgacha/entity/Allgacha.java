package com.sevenight.coldcrayon.allgacha.entity;

import com.sevenight.coldcrayon.gacha.entity.Gacha;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Allgacha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "allgacha_idx")
    private int allgachaIdx;

    @Column(name = "allgacha_img")
    private String allgachaImg;

    @OneToMany(mappedBy = "allgachaIdx")
    private List<Gacha> gachas = new ArrayList<>();
}
