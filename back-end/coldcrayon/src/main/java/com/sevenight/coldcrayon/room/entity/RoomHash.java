package com.sevenight.coldcrayon.room.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import javax.persistence.*;
import java.time.LocalDateTime;

@RedisHash("room")
@Data
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomHash {

    @Id
    private String roomIdx;

    private String gameIdx;

    private String adminUserIdx;

    private RoomStatus roomStatus;

    private int roomMax;

    private int roomNow;

    private LocalDateTime roomCreateTime;

}
