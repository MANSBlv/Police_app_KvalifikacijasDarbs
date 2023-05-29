package com.example.kvalifikacijasdarbs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@ComponentScan({"com.example.kvalifikacijasdarbs.*"})
public class KvalifikacijasDarbsApplication {

    public static void main(String[] args) {
        SpringApplication.run(KvalifikacijasDarbsApplication.class, args);
    }

}
