package com.sevenight.coldcrayon.room.dto;

import lombok.*;

@Builder
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RoomReqestDto {

    private String roomIdx;

    private Long toUserIdx;

    private int roomMax;
}