package com.sevenight.coldcrayon.game.dto;

import lombok.*;

import java.io.InputStream;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImgDto {
    InputStream img;

    String roomIdx;
}
