package com.example.kvalifikacijasdarbs.helpers;

import com.example.kvalifikacijasdarbs.models.Role;
import com.example.kvalifikacijasdarbs.models.User;

public class UserHelper {

    private UserHelper() {

    }

    public static User createUser() {
        User user = new User();

        user.setRole(Role.ROLE_USER);
        user.setEmail("steve@test.lv");
        user.setName("Steve");
        user.setSurname("Test");

        return user;
    }

}
