package com.example.kvalifikacijasdarbs.repos;

import com.example.kvalifikacijasdarbs.models.PoliceOfficer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoliceOfficerRepo extends JpaRepository<PoliceOfficer, Long> {

    PoliceOfficer findByEmail(String email);

}
