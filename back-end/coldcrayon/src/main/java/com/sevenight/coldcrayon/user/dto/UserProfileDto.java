package com.sevenight.coldcrayon.user.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@Data
public class UserProfileDto {
    private Long userIdx;
    private String userNickname;
    private String userProfile;
    private int userPoint;

}
