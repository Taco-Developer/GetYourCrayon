package com.sevenight.coldcrayon.gacha.dto;

import lombok.*;

@Builder
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RareDto {
    private Long gachaIdx;
    private String gachaImg;

//    public RareDto(String gachaImg) {
//        this.gachaImg = gachaImg;
//    }
}
