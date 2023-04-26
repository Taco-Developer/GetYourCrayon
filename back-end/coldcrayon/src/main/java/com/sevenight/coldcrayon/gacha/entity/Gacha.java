package com.sevenight.coldcrayon.gacha.entity;

import javax.persistence.*;

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

	// 이따 지움
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// 외래 키를 식별자로 사용하는 방법 적용해야함.
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_idx")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	private Allgacha allgacha;

	// // 필요한가?
	// private String gachaImg;
}
