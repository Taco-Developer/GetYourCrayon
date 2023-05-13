package com.sevenight.coldcrayon.room.entity;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("user")
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserHash {

    @Id
    private Long userIdx;

    private String roomIdx;

    private String userNickname;

    private int userPoint;

    private int userScore;

    public static UserHash createUserHash(UserDto userDto, String roomIdx){
       return UserHash.builder()
               .userIdx(userDto.getUserIdx())
               .userNickname(userDto.getUserNickname())
               .userPoint(userDto.getUserPoint())
               .userScore(10)
               .roomIdx(roomIdx)
               .build();
    }
}