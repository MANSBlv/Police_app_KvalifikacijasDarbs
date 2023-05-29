package com.example.kvalifikacijasdarbs.controller;

import com.example.kvalifikacijasdarbs.models.User;
import com.example.kvalifikacijasdarbs.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/profile/complete")
    private boolean updateExistingUser(@RequestBody Map<String, User> user){
        return userService.updateUserByEmail(user);
    }

    @GetMapping
    public User getUserByEmail(@RequestParam("email") String email) {
        return userService.findByUserEmail(email);
    }

}
