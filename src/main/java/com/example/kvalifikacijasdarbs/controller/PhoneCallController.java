package com.example.kvalifikacijasdarbs.controller;

import com.example.kvalifikacijasdarbs.service.PhoneCallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/phone-call")
public class PhoneCallController {

    @Autowired
    PhoneCallService phoneCallService;

    @PostMapping
    public boolean savePhoneCall(@RequestBody Map<String, String> phoneData){
        String phoneNumber = phoneData.get("phoneNumber");
        String userEmail = phoneData.get("user");

        return phoneCallService.savePhoneCall(phoneNumber, userEmail);
    }
}
