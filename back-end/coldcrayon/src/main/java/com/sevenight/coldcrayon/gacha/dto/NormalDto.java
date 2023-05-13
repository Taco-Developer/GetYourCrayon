package com.sevenight.coldcrayon.gacha.dto;

import lombok.*;

@Builder
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class NormalDto {
    private Long gachaIdx;
    private String gachaImg;

//    public NormalDto(String gachaImg) {
//        this.gachaImg = gachaImg;
//    }
}
