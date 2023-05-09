package com.sevenight.coldcrayon.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserCollectionDto {
    private Long gachaIdx;
    private Enum gachaClass;
    private String gachaImg;
}
