package com.sevenight.coldcrayon.game.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
public class Game {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="game_idx")
	private int gameIdx;

	@Enumerated(EnumType.STRING)
	@Column(name="game_category")
	private GameCategory gameCategory;

	@Column(name = "game_keyword")
	private String gameKeyword;

}
