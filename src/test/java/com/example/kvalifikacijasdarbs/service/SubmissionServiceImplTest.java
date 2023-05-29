package com.example.kvalifikacijasdarbs.service;

import com.example.kvalifikacijasdarbs.helpers.PoliceOfficerHelper;
import com.example.kvalifikacijasdarbs.helpers.SubmissionHelper;
import com.example.kvalifikacijasdarbs.helpers.UserHelper;
import com.example.kvalifikacijasdarbs.models.PoliceOfficer;
import com.example.kvalifikacijasdarbs.models.Status;
import com.example.kvalifikacijasdarbs.models.Submission;
import com.example.kvalifikacijasdarbs.models.User;
import com.example.kvalifikacijasdarbs.repos.PoliceOfficerRepo;
import com.example.kvalifikacijasdarbs.repos.SubmissionRepo;
import com.example.kvalifikacijasdarbs.repos.UserRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class SubmissionServiceImplTest {

    private SubmissionServiceImpl submissionService;

    @Mock
    private SubmissionRepo submissionRepo;
    @Mock
    private UserRepo userRepo;
    @Mock
    private PoliceOfficerRepo officerRepo;

    @BeforeEach
    void beforeEach() {
        submissionService = new SubmissionServiceImpl(submissionRepo, userRepo, officerRepo);
    }

    @AfterEach
    void afterEach() {
        reset(submissionRepo, userRepo, officerRepo);
    }

    @Test
    void insertSubmission() {
        User user = UserHelper.createUser();

        when(userRepo.findByEmail(user.getEmail())).thenReturn(user);

        Submission submission = SubmissionHelper.createSubmission();

        boolean result = submissionService.insertSubmission(submission, "steve@test.lv");

        verify(submissionRepo, times(1)).save(submission);
        assertTrue(result);
    }

    @Test
    void failInsertSubmission() {
        when(userRepo.findByEmail(anyString())).thenReturn(null);

        Submission submission = new Submission();

        boolean result = submissionService.insertSubmission(submission, "steve@test.lv");

        verify(submissionRepo, never()).save(any(Submission.class));
        assertFalse(result);
    }

    @Test
    void updateSubmission() {
        PoliceOfficer officer = PoliceOfficerHelper.createOfficer();

        when(submissionRepo.existsById(any())).thenReturn(true);
        when(officerRepo.findByEmail(anyString())).thenReturn(officer);

        Submission submission = SubmissionHelper.createSubmission();

        boolean result = submissionService.updateSubmission(submission, Status.REVIEWED.toString(), "test@policija.lv");

        verify(submissionRepo, times(1)).save(submission);
        assertTrue(result);
    }

    @Test
    void failUpdateSubmission() {
        when(officerRepo.findByEmail(anyString())).thenReturn(null);

        Submission submission = new Submission();

        boolean result = submissionService.updateSubmission(null, null, null);

        verify(submissionRepo, never()).save(submission);
        assertFalse(result);
    }

    @Test
    void findAllUserSubmissions() {
        User user = UserHelper.createUser();
        List<Submission> submissions = new ArrayList<>();
        submissions.add(SubmissionHelper.createSubmission());
        submissions.add(new Submission());

        when(userRepo.existsByEmail(user.getEmail())).thenReturn(true);
        when(userRepo.findByEmail(user.getEmail())).thenReturn(user);
        when(submissionRepo.findAllByUserOrderBySubmissionDateDesc(user)).thenReturn(submissions);

        List<Submission> result = submissionService.findAllSubmissionsByUser(user.getEmail());

        verify(userRepo, times(1)).existsByEmail(user.getEmail());
        verify(userRepo, times(1)).findByEmail(user.getEmail());
        verify(submissionRepo, times(1)).findAllByUserOrderBySubmissionDateDesc(user);
        assertEquals(submissions, result);
    }

    @Test
    void failFindAllUserSubmissions() {
        when(userRepo.existsByEmail(anyString())).thenReturn(false);

        List<Submission> result = submissionService.findAllSubmissionsByUser("test@inbox.lv");

        assertEquals(Collections.emptyList(), result);
    }

    @Test
    void deleteSubmission() throws Exception {
        Submission submission = SubmissionHelper.createSubmission();
        User user = UserHelper.createUser();

        when(userRepo.existsByEmail(user.getEmail())).thenReturn(true);
        when(submissionRepo.existsById(any())).thenReturn(true);

        submissionService.deleteSubmission(user.getEmail(), submission);

        verify(userRepo, times(1)).existsByEmail(user.getEmail());
        verify(submissionRepo, times(1)).existsById(any());
        verify(submissionRepo, times(1)).save(submission);
        assertTrue(submission.getIsDeleted());
    }

    @Test
    void failDeleteSubmission() {
        Submission submission = SubmissionHelper.createSubmission();
        User user = UserHelper.createUser();

        when(userRepo.existsByEmail(user.getEmail())).thenReturn(false);
        when(submissionRepo.existsById(any())).thenReturn(false);

        assertThrows(Exception.class, () -> submissionService.deleteSubmission(user.getEmail(), submission));

        verify(submissionRepo, never()).save(submission);
    }

}
