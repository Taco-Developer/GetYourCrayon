package com.sevenight.coldcrayon.auth.dto;

import com.sevenight.coldcrayon.user.entity.User;
import lombok.*;

@Builder
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long userIdx;
    private String userEmail;
    private String userNickname;
    private Integer userPoint;
    private String userProfile;

//    @Builder
//    public UserDto(User user) {
//        this.userIdx = user.getUserIdx();
//        this.userEmail = user.getUserEmail();
//        this.userNickname = user.getUserNickname();
//        this.userPoint = user.getUserPoint();
//        this.userProfile = user.getUserProfile();
//    }

    public static UserDto of(User user){
        return UserDto.builder()
                .userIdx(user.getUserIdx())
                .userEmail(user.getUserEmail())
                .userNickname(user.getUserNickname())
                .userPoint(user.getUserPoint())
                .userProfile(user.getUserProfile())
                .build();
    }
}