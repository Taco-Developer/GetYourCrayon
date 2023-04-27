package com.sevenight.coldcrayon.user.entity;

import com.sevenight.coldcrayon.board.entity.Board;
import com.sevenight.coldcrayon.gacha.entity.Gacha;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
public class User {

    @Id
    @Column(name = "user_idx")
    private String userIdx;

    @Column(name = "user_token")
    private String userToken;

    @Column(name = "user_nickname")
    private String userNickname;

    @Column(name = "user_profile")
    private String userProfile;

    @UpdateTimestamp
    @Column(name = "user_last_login")
    private LocalDateTime userLastLogin;

    @CreationTimestamp
    @Column(name = "user_create_time")
    private LocalDateTime userCreateTime;

    @Column(name = "user_status")
    private boolean userStatus;

    @Column(name = "user_point")
    private int userPoint;

    // 역 방향
    @OneToMany(mappedBy = "userIdx")
    private List<Gacha> userGachas = new ArrayList<>();

    @OneToMany(mappedBy = "userIdx")
    private List<Board> userUploads = new ArrayList<>();


}
