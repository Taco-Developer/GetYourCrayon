package com.sevenight.coldcrayon.room.entity;

import com.sevenight.coldcrayon.game.entity.Game;
import com.sevenight.coldcrayon.joinlist.entity.Joinlist;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Room {

    @Id
    @Column(name = "room_idx")
    private String roomIdx;

    // 랜덤값 생성
    // setter로 roomIdx에 넣어줌

    @JoinColumn(name = "game")
    @OneToOne(fetch = FetchType.LAZY)
    private Game game;

    // 방장
    private String adminIdx;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_state")
    private RoomStatus roomStatus;

    @Column(name = "room_max")
    private int roomMax;

    @Column(name = "room_now")
    private int roomNow;

    @CreationTimestamp
    @Column(name = "room_create_time")
    private LocalDateTime roomCreateTime;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Joinlist> joinlists = new ArrayList<>();

}
