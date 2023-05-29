package com.example.kvalifikacijasdarbs.service;

import com.example.kvalifikacijasdarbs.models.User;

import java.util.Map;

public interface UserService {

    User createUser(Map<String, String> userEmail);

    boolean updateUserByEmail(Map<String, User> user);

    User findByUserEmail(String email);

}
