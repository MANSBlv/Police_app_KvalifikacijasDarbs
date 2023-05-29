package com.example.kvalifikacijasdarbs.controller;

import com.example.kvalifikacijasdarbs.models.Submission;
import com.example.kvalifikacijasdarbs.models.User;
import com.example.kvalifikacijasdarbs.repos.UserRepo;
import com.example.kvalifikacijasdarbs.service.SubmissionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    @Autowired
    private  SubmissionService submissionService;

    @GetMapping("/user")
    public List<Submission> getAllSubmissionsForUser(@RequestParam String email) {
        return submissionService.findAllSubmissionsByUser(email);
    }

    @GetMapping("/all")
    public List<Submission> getAllSubmissions() throws JsonProcessingException {
        return submissionService.findAllSubmissions();
    }

    @PostMapping
    public boolean createSubmission(@RequestBody Submission submission, @RequestParam String email) {
        return submissionService.insertSubmission(submission, email);
    }

    @GetMapping("/{id}")
    public Submission getSubmissionById(@PathVariable Long id) {
        return submissionService.findSubmissionById(id);
    }

    @PutMapping("/police/update")
    public boolean updateSubmission(@RequestBody Submission submission, @RequestParam("status") String status, @RequestParam("email") String email) {
        return submissionService.updateSubmission(submission, status, email);
    }

    @PutMapping("/delete")
    public void deleteSubmission( @RequestParam("email") String email, @RequestBody Submission submission) throws Exception {
        submissionService.deleteSubmission(email, submission);
    }

}
