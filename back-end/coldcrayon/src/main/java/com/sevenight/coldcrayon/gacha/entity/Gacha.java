package com.sevenight.coldcrayon.gacha.entity;

import com.sevenight.coldcrayon.allgacha.entity.Allgacha;
import com.sevenight.coldcrayon.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Gacha {

    // 이따 지움
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gacha_idx")
    private Long gachaIdx;

    // 외래 키를 식별자로 사용하는 방법 적용해야함.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    private User userIdx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "allgacha_idx")
    private Allgacha allgachaIdx;

}
