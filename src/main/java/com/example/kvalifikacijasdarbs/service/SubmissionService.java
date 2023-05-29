package com.example.kvalifikacijasdarbs.service;

import com.example.kvalifikacijasdarbs.models.Submission;

import java.util.ArrayList;
import java.util.List;

public interface SubmissionService {

    boolean insertSubmission(Submission submission, String email);

    boolean updateSubmission(Submission submission, String status, String email);

    ArrayList<Submission> findAllSubmissions();

    List<Submission> findAllSubmissionsByUser(String email);

    Submission findSubmissionById(long id);

    void deleteSubmission(String email, Submission submission) throws Exception;

}
