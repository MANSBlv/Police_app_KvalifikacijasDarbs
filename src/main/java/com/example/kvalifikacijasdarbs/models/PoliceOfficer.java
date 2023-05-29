package com.example.kvalifikacijasdarbs.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "officerId")
public class PoliceOfficer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(value = AccessLevel.NONE)
    @Column
    private Long officerId;
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

    @OneToMany(mappedBy = "policeOfficer")
    @ToString.Exclude
    private Collection<Submission> submissions = new ArrayList<>();

    public PoliceOfficer(String name,String surname, String phoneNr, String email,Role role){
        this.name = name;
        this.surname = surname;
        this.phoneNr = phoneNr;
        this.email = email;
        this.role = role;
    }

    public PoliceOfficer() {

    }

    public void addSubmissions(Submission submission) {
        submissions.add(submission);
    }

}
