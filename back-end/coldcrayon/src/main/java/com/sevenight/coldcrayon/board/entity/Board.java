package com.sevenight.coldcrayon.board.entity;

import java.time.LocalDateTime;

import javax.persistence.*;

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
	private int boardId;

	@ManyToOne(fetch = FetchType.LAZY)
	private User user;

	private String boardTitle;

	private String boardContent;

	// 1
	 @CreationTimestamp
	 private LocalDateTime boardCreateTime;

	 @UpdateTimestamp
	 private LocalDateTime boardUpdateTime;
}
