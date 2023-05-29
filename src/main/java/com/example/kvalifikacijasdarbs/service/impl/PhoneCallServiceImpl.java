package com.example.kvalifikacijasdarbs.service.impl;

import com.example.kvalifikacijasdarbs.models.PhoneCall;
import com.example.kvalifikacijasdarbs.models.User;
import com.example.kvalifikacijasdarbs.repos.PhoneCallRepo;
import com.example.kvalifikacijasdarbs.repos.UserRepo;
import com.example.kvalifikacijasdarbs.service.PhoneCallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
@Service
public class PhoneCallServiceImpl implements PhoneCallService {

    @Autowired
    private PhoneCallRepo phoneCallRepo;
    @Autowired
    private UserRepo userRepo;

    public PhoneCallServiceImpl(PhoneCallRepo phoneCallRepo, UserRepo userRepo) {
        this.phoneCallRepo = phoneCallRepo;
        this.userRepo = userRepo;
    }

    @Override
    public boolean savePhoneCall(String phoneNumber, String userEmail) {
        if (userRepo.existsByEmail(userEmail)) {
            User user = userRepo.findByEmail(userEmail);
            PhoneCall lastCall = phoneCallRepo.findTopByUserAndPhoneNumberOrderByCallingTimeDesc(user, phoneNumber);
            if (lastCall != null && lastCall.getCallingTime().plusHours(24).isAfter(LocalDateTime.now())) {
                return false;
            }

            PhoneCall phoneCall = new PhoneCall();
            phoneCall.setPhoneNumber(phoneNumber);
            phoneCall.setUser(user);
            phoneCall.setCallingTime(LocalDateTime.now());

            user.addPhoneCall(phoneCall);
            phoneCallRepo.save(phoneCall);
            userRepo.save(user);
            return true;
        } else {
            return false;
        }

    }

}
