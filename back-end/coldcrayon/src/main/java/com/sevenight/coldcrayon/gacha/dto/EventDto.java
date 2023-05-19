package com.sevenight.coldcrayon.gacha.dto;

import lombok.*;

@Builder
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EventDto {
    private Long gachaIdx;
    private String gachaImg;
//
//    public EventDto(String gachaImg) {
//        this.gachaImg = gachaImg;
//    }
}
