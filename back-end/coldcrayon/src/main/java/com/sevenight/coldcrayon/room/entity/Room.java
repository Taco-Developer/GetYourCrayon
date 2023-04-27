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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_idx")
    private String roomIdx;

    @JoinColumn(name = "game")
    @OneToOne(fetch = FetchType.LAZY)
    private Game game;

    @Column(name = "room_name")
    private String roomName;

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
