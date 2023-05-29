package com.example.kvalifikacijasdarbs.service.impl;

import com.example.kvalifikacijasdarbs.models.Role;
import com.example.kvalifikacijasdarbs.models.User;
import com.example.kvalifikacijasdarbs.repos.UserRepo;
import com.example.kvalifikacijasdarbs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public User createUser(Map<String, String> userEmail) {
        String email = userEmail.get("email");

        User user = new User();
        user.setEmail(email);

        return userRepo.save(user);
    }

    @Override
    public boolean updateUserByEmail(Map<String, User> userData) {
        User user = userData.get("user");
        String email = user.getEmail();
        if (userRepo.existsByEmail(email)) {
            User result = userRepo.findByEmail(email);

            result.setName(user.getName());
            result.setPhoneNr(user.getPhoneNr());
            result.setSurname(user.getSurname());
            result.setRole(Role.ROLE_USER);

            userRepo.save(result);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public User findByUserEmail(String email) {
        return userRepo.findByEmail(email);
    }

}
