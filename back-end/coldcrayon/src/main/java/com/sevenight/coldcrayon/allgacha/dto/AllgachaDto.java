package com.sevenight.coldcrayon.allgacha.dto;

import com.sevenight.coldcrayon.allgacha.entity.GachaClass;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AllgachaDto {

    private Long allgachaIdx;
    private String allgachaImg;
    private GachaClass allgachaClass;
}
