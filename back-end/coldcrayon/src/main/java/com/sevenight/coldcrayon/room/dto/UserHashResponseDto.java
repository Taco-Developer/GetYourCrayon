package com.sevenight.coldcrayon.room.dto;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.room.entity.UserHash;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;

@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserHashResponseDto {

    private Long userIdx;

    private String roomIdx;

    private String userNickname;

    private int userPoint;

    private int userScore;


    public static UserHashResponseDto of(UserHash userHash){
        UserHashResponseDto userHashResponseDto = new UserHashResponseDto();
        userHashResponseDto.userIdx = userHash.getUserIdx();
        userHashResponseDto.roomIdx = userHash.getRoomIdx();
        userHashResponseDto.userNickname = userHash.getUserNickname();
        userHashResponseDto.userPoint = userHash.getUserPoint();
        userHashResponseDto.userScore = userHash.getUserScore();

        return userHashResponseDto;
    }
}
