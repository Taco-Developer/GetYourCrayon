package com.sevenight.coldcrayon.auth.dto;

import lombok.*;

@Builder
@Setter
@Getter
@ToString
@NoArgsConstructor
public class UserResponseDto {
    private Long userIdx;
    private String userNickname;
    private Integer userPoint;
    private String userProfile;

    @Builder
    public UserResponseDto(Long userIdx, String userNickname, Integer userPoint, String userProfile) {
        this.userIdx = userIdx;
        this.userNickname = userNickname;
        this.userPoint = userPoint;
        this.userProfile = userProfile;
    }
}
