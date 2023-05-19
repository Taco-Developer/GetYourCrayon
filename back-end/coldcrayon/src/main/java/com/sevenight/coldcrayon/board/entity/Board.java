package com.sevenight.coldcrayon.board.entity;

import com.sevenight.coldcrayon.user.entity.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Board {
    // PK (AUTO_INCREMENT)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_idx")
    private int boardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    private User userIdx;

    @Column(name = "board_title")
    private String boardTitle;

    @Column(name = "board_content")
    private String boardContent;

    // 1
    @CreationTimestamp
    @Column(name = "board_create_time")
    private LocalDateTime boardCreateTime;

    @UpdateTimestamp
    @Column(name = "board_update_time")
    private LocalDateTime boardUpdateTime;
}
