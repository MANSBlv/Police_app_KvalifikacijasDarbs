package com.example.kvalifikacijasdarbs.repos;

import com.example.kvalifikacijasdarbs.models.Submission;
import com.example.kvalifikacijasdarbs.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SubmissionRepo extends JpaRepository<Submission, Long> {

    List<Submission> findAllByUserOrderBySubmissionDateDesc(User user);

    List<Submission> findAllByOrderBySubmissionDateDesc();

}
