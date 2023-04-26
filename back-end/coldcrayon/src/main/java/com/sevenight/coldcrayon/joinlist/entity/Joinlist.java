package com.sevenight.coldcrayon.joinlist.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

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

	// 중개 테이블 외래키로 식별하는 방법 적용
	@ManyToOne
	@JoinColumn(name="room_idx")
	private Room room;

	@OneToOne
	@JoinColumn(name="user_idx")
	private User user;

}
