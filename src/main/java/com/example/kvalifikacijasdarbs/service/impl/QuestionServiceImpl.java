package com.example.kvalifikacijasdarbs.service.impl;

import com.example.kvalifikacijasdarbs.models.Question;
import com.example.kvalifikacijasdarbs.repos.QuestionRepo;
import com.example.kvalifikacijasdarbs.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepo questionRepo;

    @Override
    public boolean createQuestion(Question question) {
        return false;
    }

    @Override
    public boolean deleteQuestionById(Long id) {
        return false;
    }

    @Override
    public boolean updateQuestionById(Question question, Long id) {
        return false;
    }

    @Override
    public ArrayList<Question> findAllQuestions() {
        return null;
    }
}
