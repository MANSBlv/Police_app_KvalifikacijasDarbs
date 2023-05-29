package com.example.kvalifikacijasdarbs.helpers;

import com.example.kvalifikacijasdarbs.models.PoliceOfficer;

public class PoliceOfficerHelper {
    private PoliceOfficerHelper() {

    }

    public static PoliceOfficer createOfficer() {
        PoliceOfficer officer = new PoliceOfficer();

        officer.setName("Albert");
        officer.setSurname("Steward");

        return officer;
    }
}
