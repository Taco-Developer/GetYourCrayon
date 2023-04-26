package com.sevenight.coldcrayon.user.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
public class User {

	@Id
	private String userIdx;

	private String userToken;

	private String userNickname;

	private String userProfile;

	@UpdateTimestamp
	private LocalDateTime userLastLogin;

	@CreationTimestamp
	private LocalDateTime userCreateTime;

	private boolean userStatus;

	private int userPoint;

	// 역 방향
}
