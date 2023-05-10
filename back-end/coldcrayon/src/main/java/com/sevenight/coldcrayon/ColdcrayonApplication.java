package com.sevenight.coldcrayon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
public class ColdcrayonApplication {

	public static void main(String[] args) {
		SpringApplication.run(ColdcrayonApplication.class, args);
	}

}
