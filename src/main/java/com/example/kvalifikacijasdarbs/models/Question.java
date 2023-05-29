package com.example.kvalifikacijasdarbs.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Entity
@Table
@Data
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(value = AccessLevel.NONE)
    @Column(name = "questionId")
    private Long questionId;
    @Column(name = "question")
    private String question;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    public Question(String question, User user){
        this.question = question;
        this.user = user;
    }
    public Question(){

    }

}
