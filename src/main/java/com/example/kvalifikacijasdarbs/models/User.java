package com.example.kvalifikacijasdarbs.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import lombok.ToString;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table
@Data
@JsonIdentityInfo(scope = User.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(value = AccessLevel.NONE)
    @Column
    private Long userId;
    @Column
    private String name;
    @Column
    private String surname;
    @Column(name = "phoneNumber")
    private String phoneNr;
    @Column(unique = true)
    private String email;
    @Column
    private Role role;
    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Collection<Submission> submissions = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Collection<PhoneCall> phoneCalls = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Collection<Question> questions = new ArrayList<>();

    public User(String name,String surname, String phoneNr, String email,Role role){
        this.name = name;
        this.surname = surname;
        this.phoneNr = phoneNr;
        this.email = email;
        this.role = role;
    }

    public User() {

    }

    public void addSubmission(Submission submission){
        submissions.add(submission);
    }

    public void addPhoneCall(PhoneCall call) {
        phoneCalls.add(call);
    }

    public void removeSubmission(Submission submission){
        submissions.remove(submission);
    }

    public void addQuestion(Question question){
        questions.add(question);
    }

    public void removeQuestion(Question question){
        questions.remove(question);
    }

}
