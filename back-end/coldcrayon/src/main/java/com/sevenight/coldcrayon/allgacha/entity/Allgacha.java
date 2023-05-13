package com.sevenight.coldcrayon.allgacha.entity;

import com.sevenight.coldcrayon.gacha.entity.Gacha;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(includeFieldNames=true, of={"allgachaIdx", "allgachaImg", "allgachaClass"})
public class Allgacha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "allgacha_idx")
    private Long allgachaIdx;

    @Column(name = "allgacha_img")
    private String allgachaImg;

    @OneToMany(mappedBy = "allgachaIdx")
    @Builder.Default
    private List<Gacha> gachas = new ArrayList<>();

    @NotNull
    @Enumerated(EnumType.STRING)
    private GachaClass allgachaClass;
}
