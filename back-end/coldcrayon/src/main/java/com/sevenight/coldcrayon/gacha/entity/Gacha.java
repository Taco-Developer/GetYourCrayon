package com.sevenight.coldcrayon.gacha.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.sevenight.coldcrayon.allgacha.entity.Allgacha;
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
public class Gacha {


	// 외래 키를 식별자로 사용하는 방법 적용해야함.
	@ManyToOne
	@JoinColumn(name="user_idx")
	private User user;

	@ManyToOne
	private Allgacha allgacha;

	// // 필요한가?
	// private String gachaImg;
}
