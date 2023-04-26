package com.sevenight.coldcrayon.joinlist.entity;

import javax.persistence.*;

import com.sevenight.coldcrayon.room.entity.Room;
import com.sevenight.coldcrayon.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="user_join_list")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Joinlist {

	// 이따 지움
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	// 중개 테이블 외래키로 식별하는 방법 적용
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="room_idx")
	private Room room;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_idx")
	private User user;

}
