package com.sevenight.coldcrayon.gacha.dto;

import lombok.*;

@Builder
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SuperRareDto {
    private Long gachaIdx;
    private String gachaImg;

//    public SuperRareDto(String gachaImg) {
//        this.gachaImg = gachaImg;
//    }
}
