package com.example.kvalifikacijasdarbs.repos;

import com.example.kvalifikacijasdarbs.models.Question;
import com.example.kvalifikacijasdarbs.models.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepo extends JpaRepository<Question, Long> {
}
