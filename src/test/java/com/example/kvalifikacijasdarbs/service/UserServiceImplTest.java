package com.example.kvalifikacijasdarbs.service;

import com.example.kvalifikacijasdarbs.helpers.UserHelper;
import com.example.kvalifikacijasdarbs.models.User;
import com.example.kvalifikacijasdarbs.repos.UserRepo;
import com.example.kvalifikacijasdarbs.service.impl.UserServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class UserServiceImplTest {

    private UserServiceImpl userService;

    @Mock
    private UserRepo userRepo;

    @BeforeEach
    void beforeEach() {
        userService = new UserServiceImpl(userRepo);
    }

    @AfterEach
    void afterEach() {
        reset(userRepo);
    }

    @Test
    void testCreateUser() {
        String email = "Aivars@inbox.lv";
        Map<String, String> userEmail = new HashMap<>();
        userEmail.put("email", email);

        User user = new User();
        user.setEmail(email);

        userService.createUser(userEmail);

        verify(userRepo, times(1)).save(user);
    }

    @Test
    void updateUserByEmail() {
        User user = UserHelper.createUser();
        Map<String, User> userData = new HashMap<>();
        userData.put("user", user);

        when(userRepo.existsByEmail(user.getEmail())).thenReturn(true);
        when(userRepo.findByEmail(user.getEmail())).thenReturn(user);

        boolean result = userService.updateUserByEmail(userData);

        assertTrue(result);
    }

}
