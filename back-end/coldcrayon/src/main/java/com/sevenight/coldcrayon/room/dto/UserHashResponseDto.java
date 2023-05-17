package com.sevenight.coldcrayon.room.dto;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.room.entity.UserHash;
import lombok.*;
import org.springframework.data.annotation.Id;

@ToString
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserHashResponseDto {

    private Long userIdx;

    private String roomIdx;

    private String userNickname;

    private String userProfile;

    private int userPoint; // 가챠 할 수 있는 포인트

    private int userScore; // 게임 시작하고 얻은 점수

    public static UserHashResponseDto of(UserHash userHash){
        UserHashResponseDto userHashResponseDto = new UserHashResponseDto();
        userHashResponseDto.userIdx = userHash.getUserIdx();
        userHashResponseDto.roomIdx = userHash.getRoomIdx();
        userHashResponseDto.userNickname = userHash.getUserNickname();
        userHashResponseDto.userProfile = userHash.getUserProfile();
        userHashResponseDto.userPoint = userHash.getUserPoint();
        userHashResponseDto.userScore = userHash.getUserScore();

        return userHashResponseDto;
    }
}
