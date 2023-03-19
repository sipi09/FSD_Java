package com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class SpringBootSportyShoesRestfulCrudApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSportyShoesRestfulCrudApplication.class, args);
	}

}
