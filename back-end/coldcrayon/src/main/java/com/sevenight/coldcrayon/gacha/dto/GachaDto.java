package com.sevenight.coldcrayon.gacha.dto;

import com.sevenight.coldcrayon.allgacha.entity.GachaClass;
import lombok.*;

@Builder
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class GachaDto {
    private Long gachaIdx;
    private String gachaImg;
    private GachaClass gachaClass;
    private Boolean existGacha;

//    public GachaDto(Long gachaIdx, String gachaImg, GachaClass gachaClass) {
//        this.gachaIdx = gachaIdx;
//        this.gachaImg = gachaImg;
//        this.gachaClass = gachaClass;
//    }

    public GachaDto(String gachaImg, GachaClass gachaClass, Boolean existGacha) {
        this.gachaImg = gachaImg;
        this.gachaClass = gachaClass;
        this.existGacha = existGacha;
    }
}
