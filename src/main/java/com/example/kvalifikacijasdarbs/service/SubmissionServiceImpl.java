package com.example.kvalifikacijasdarbs.service;

import com.example.kvalifikacijasdarbs.models.PoliceOfficer;
import com.example.kvalifikacijasdarbs.models.Submission;
import com.example.kvalifikacijasdarbs.models.User;
import com.example.kvalifikacijasdarbs.repos.PoliceOfficerRepo;
import com.example.kvalifikacijasdarbs.repos.SubmissionRepo;
import com.example.kvalifikacijasdarbs.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubmissionServiceImpl implements SubmissionService {

    @Autowired
    private SubmissionRepo submissionRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PoliceOfficerRepo officerRepo;

    public SubmissionServiceImpl(SubmissionRepo submissionRepo, UserRepo userRepo, PoliceOfficerRepo officerRepo) {
        this.submissionRepo = submissionRepo;
        this.userRepo = userRepo;
        this.officerRepo = officerRepo;
    }

    @Override
    public boolean insertSubmission(Submission submission, String email) {
        User user = userRepo.findByEmail(email);
        if(submission != null && user != null) {
            submission.setUser(user);
            user.addSubmission(submission);
            submissionRepo.save(submission);
            userRepo.save(user);
            return true;
        }else{
            return false;
        }
    }

    public boolean updateSubmission(Submission submission, String status, String email){
        PoliceOfficer officer = officerRepo.findByEmail(email);
        if (officer != null && submissionRepo.existsById(submission.getSubmissionId())) {
            submission.setPoliceOfficer(officer);
            officer.addSubmissions(submission);
            submissionRepo.save(submission);
            officerRepo.save(officer);
            return true;
        }
        return false;
    }

    public ArrayList<Submission> findAllSubmissions() {
        return (ArrayList<Submission>) submissionRepo.findAllByOrderBySubmissionDateDesc();
    }

    @Override
    public List<Submission> findAllSubmissionsByUser(String email) {
        if(userRepo.existsByEmail(email)){
            User user = userRepo.findByEmail(email);
            List<Submission> submissions = submissionRepo.findAllByUserOrderBySubmissionDateDesc(user);
            submissions = submissions.stream()
                    .filter(submission -> submission.getIsDeleted() == null || !submission.getIsDeleted())
                    .collect(Collectors.toList());
            return submissions;
        }else {
            return new ArrayList<>();
        }
    }

    public Submission findSubmissionById(long id) {
        return submissionRepo.findById(id).orElse(null);
    }

    public void deleteSubmission(String email, Submission submission) throws Exception {
        if(userRepo.existsByEmail(email) && submissionRepo.existsById(submission.getSubmissionId())){
            submission.setIsDeleted(true);

            submissionRepo.save(submission);
        }else {
            throw new Exception("cant Delete Submission");
        }
    }

}
