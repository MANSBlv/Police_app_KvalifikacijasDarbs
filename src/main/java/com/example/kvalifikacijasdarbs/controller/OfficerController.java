package com.example.kvalifikacijasdarbs.controller;

import com.example.kvalifikacijasdarbs.service.PoliceOfficerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/officer")
public class OfficerController {

    @Autowired
    PoliceOfficerService policeOfficerService;

    @GetMapping
    public boolean findOfficerByEmail(@RequestParam("email") String email) {
        return policeOfficerService.isPoliceOfficer(email);
    }

}
