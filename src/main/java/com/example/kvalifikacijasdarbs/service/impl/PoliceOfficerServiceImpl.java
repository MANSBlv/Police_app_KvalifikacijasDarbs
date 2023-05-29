package com.example.kvalifikacijasdarbs.service.impl;

import com.example.kvalifikacijasdarbs.models.Role;
import com.example.kvalifikacijasdarbs.models.User;
import com.example.kvalifikacijasdarbs.repos.UserRepo;
import com.example.kvalifikacijasdarbs.service.PoliceOfficerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PoliceOfficerServiceImpl implements PoliceOfficerService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public boolean isPoliceOfficer(String email) {
        User user = userRepo.findByEmail(email);
        if (user != null && user.getRole() != Role.ROLE_OFFICER) {
            return false;
        }
        return true;
    }

}
