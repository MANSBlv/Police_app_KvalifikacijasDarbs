package com.example.kvalifikacijasdarbs.controller;

import com.example.kvalifikacijasdarbs.models.User;
import com.example.kvalifikacijasdarbs.service.UserService;
import com.google.firebase.auth.UserRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/register")
public class RegisterController {

    @Autowired
    private UserService userService;

    @PostMapping
    public User createUser(@RequestBody Map<String, String> userEmail) {
        Logger logger = LoggerFactory.getLogger(RegisterController.class);
        logger.info("Received user: {}", userEmail);

        return userService.createUser(userEmail);
    }
}
