package com.sevenight.coldcrayon.room.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;

import com.sevenight.coldcrayon.game.entity.Game;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Room {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="room_idx")
	private String roomIdx;

	@OneToOne
	@Column(name = "game")
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

}
