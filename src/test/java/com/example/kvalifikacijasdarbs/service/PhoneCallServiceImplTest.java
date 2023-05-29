package com.example.kvalifikacijasdarbs.service;

import com.example.kvalifikacijasdarbs.helpers.UserHelper;
import com.example.kvalifikacijasdarbs.models.PhoneCall;
import com.example.kvalifikacijasdarbs.models.User;
import com.example.kvalifikacijasdarbs.repos.PhoneCallRepo;
import com.example.kvalifikacijasdarbs.repos.UserRepo;
import com.example.kvalifikacijasdarbs.service.impl.PhoneCallServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class PhoneCallServiceImplTest {

    private PhoneCallServiceImpl phoneCallService;

    @Mock
    private PhoneCallRepo phoneCallRepo;
    @Mock
    private UserRepo userRepo;

    @BeforeEach
    void beforeEach() {
        phoneCallService = new PhoneCallServiceImpl(phoneCallRepo, userRepo);
    }

    @AfterEach
    void afterEach() {
        reset(phoneCallRepo, userRepo);
    }

    @Test
    void savePhoneCall() {
        String phoneNumber = "123456789";
        User user = UserHelper.createUser();

        when(userRepo.existsByEmail(user.getEmail())).thenReturn(true);
        when(userRepo.findByEmail(user.getEmail())).thenReturn(user);
        when(phoneCallRepo.findTopByUserAndPhoneNumberOrderByCallingTimeDesc(user, phoneNumber)).thenReturn(null);

        boolean result = phoneCallService.savePhoneCall(phoneNumber, user.getEmail());

        verify(userRepo, times(1)).existsByEmail(user.getEmail());
        verify(userRepo, times(1)).findByEmail(user.getEmail());
        verify(phoneCallRepo, times(1)).findTopByUserAndPhoneNumberOrderByCallingTimeDesc(user, phoneNumber);
        verify(phoneCallRepo, times(1)).save(any());

        assertTrue(result);
    }

    @Test
    void dontSavePhoneCall() {
        String phoneNumber = "98765432";
        User user = UserHelper.createUser();
        PhoneCall lastCall = new PhoneCall();
        lastCall.setCallingTime(LocalDateTime.now().minusHours(5));

        when(userRepo.existsByEmail(user.getEmail())).thenReturn(true);
        when(userRepo.findByEmail(user.getEmail())).thenReturn(user);
        when(phoneCallRepo.findTopByUserAndPhoneNumberOrderByCallingTimeDesc(user, phoneNumber)).thenReturn(lastCall);

        boolean result = phoneCallService.savePhoneCall(phoneNumber, user.getEmail());

        verify(userRepo, times(1)).existsByEmail(user.getEmail());
        verify(userRepo, times(1)).findByEmail(user.getEmail());
        verify(phoneCallRepo, times(1)).findTopByUserAndPhoneNumberOrderByCallingTimeDesc(user, phoneNumber);
        verify(phoneCallRepo, never()).save(any());

        assertFalse(result);
    }

    @Test
    void userDoesNotExist() {
        String phoneNumber = "10293487";
        String email = "test@inbox.lv";

        when(userRepo.existsByEmail(email)).thenReturn(false);

        boolean result = phoneCallService.savePhoneCall(phoneNumber, email);

        assertFalse(result);
    }

}
