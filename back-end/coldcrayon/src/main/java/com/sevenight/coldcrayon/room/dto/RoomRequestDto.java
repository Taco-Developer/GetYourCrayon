package com.sevenight.coldcrayon.room.dto;

import lombok.*;

@Builder
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequestDto {

    private String roomIdx;

    private Long toUserIdx;

    private int roomMax;
}