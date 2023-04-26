package com.sevenight.coldcrayon.board.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.sevenight.coldcrayon.user.entity.User;

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
public class Board {

	// PK (AUTO_INCREMENT)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="board_id")
	private int boardId;

	@ManyToOne
	private User user;

	@Column(name="board_title")
	private String boardTitle;

	@Column(name = "board_content")
	private String boardContent;

	// // 1
	// @CreationTimestamp
	// private LocalDateTime boardCreateTime;
	//
	// @UpdateTimestamp
	// private LocalDateTime boardUpdateTime;

	// // 2
	// @CreationTimestamp
	// private LocalDateTime boardCreateTime;

	// 3
	private LocalDateTime boardCreateTime;

}
