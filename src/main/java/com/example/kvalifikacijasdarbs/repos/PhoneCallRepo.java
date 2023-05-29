package com.example.kvalifikacijasdarbs.repos;

import com.example.kvalifikacijasdarbs.models.PhoneCall;
import com.example.kvalifikacijasdarbs.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhoneCallRepo extends JpaRepository<PhoneCall, Long> {

    PhoneCall findTopByUserAndPhoneNumberOrderByCallingTimeDesc(User user, String phoneNumber);

}
