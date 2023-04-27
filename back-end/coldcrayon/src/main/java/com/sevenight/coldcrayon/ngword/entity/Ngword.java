package com.sevenight.coldcrayon.ngword.entity;


import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Ngword {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ngword_idx")
	private int ngwordIdx;

	@Column(name="ngword_contest")
	private String ngwordContent;
}
