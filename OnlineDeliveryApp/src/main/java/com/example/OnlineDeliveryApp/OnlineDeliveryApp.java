package com.example.OnlineDeliveryApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.Controller", "com.example.Service", "com.example.config"})
@EnableJpaRepositories(basePackages = "com.example.Repository")
@EntityScan(basePackages = "com.example.Model")

public class OnlineDeliveryApp {

    public static void main(String[] args) {
        SpringApplication.run(OnlineDeliveryApp.class, args);
    }
}
