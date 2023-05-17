package com.sevenight.coldcrayon.room.entity;

import com.sevenight.coldcrayon.game.entity.GameCategory;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;

@RedisHash("room")
@ToString
@Setter
@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class RoomHash {
    @Id
    private String roomIdx;

    private GameCategory gameCategory;

    private int gameCnt;

    private int nowRound;

    private int maxRound;

    private Long adminUserIdx;

    private RoomStatus roomStatus;

    private int roomMax;

    private int roomNow;

    private LocalDateTime roomCreateTime;

    private Long correctUser = 0L;
}
