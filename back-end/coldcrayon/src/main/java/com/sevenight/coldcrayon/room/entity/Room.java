package com.sevenight.coldcrayon.room.entity;

import java.time.LocalDateTime;

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
	private String roomIdx;

	@OneToOne
	private Game game;

	private String roomName;

	@Enumerated(EnumType.STRING)
	private RoomStatus roomStatus;

	private int roomMax;

	private int roomNow;

	@CreationTimestamp
	private LocalDateTime roomCreateTime;

}
