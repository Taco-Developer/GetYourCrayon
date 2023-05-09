package com.sevenight.coldcrayon.user.entity;

import com.sevenight.coldcrayon.auth.entity.Role;
import com.sevenight.coldcrayon.board.entity.Board;
import com.sevenight.coldcrayon.gacha.entity.Gacha;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_idx")
    private Long userIdx;
    @Column(name = "user_email", length = 512)
    private String userEmail;

    @Column(name = "user_nickname")
    private String userNickname;
    @Column(name = "user_profile")
    private String userProfile;
    @Column(name = "user_status")
    private boolean userStatus;
    @Column(name = "user_point")
    @Builder.Default
    private Integer userPoint = 0;
    @Column(name = "user_provider", nullable = false)
//    @Enumerated(EnumType.STRING)
    private String userProvider;
    @Column(name = "user_role", length = 20)
    @Enumerated(EnumType.STRING)
    private Role role;
    @CreationTimestamp
    @Column(name = "user_create_time")
    private LocalDateTime userCreateTime;

    // 역 방향
    @OneToMany(mappedBy = "userIdx")
    @Builder.Default
    private List<Gacha> userGachas = new ArrayList<>();

    @OneToMany(mappedBy = "userIdx")
    @Builder.Default
    private List<Board> userUploads = new ArrayList<>();


}
