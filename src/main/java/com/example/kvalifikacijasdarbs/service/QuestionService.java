package com.example.kvalifikacijasdarbs.service;

import com.example.kvalifikacijasdarbs.models.Question;

import java.util.ArrayList;

public interface QuestionService {

    boolean createQuestion(Question question);
    boolean deleteQuestionById(Long id);
    boolean updateQuestionById(Question question, Long id);
    ArrayList<Question> findAllQuestions();

}
