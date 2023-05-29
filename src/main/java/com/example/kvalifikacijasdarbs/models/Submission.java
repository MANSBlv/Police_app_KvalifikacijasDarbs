package com.example.kvalifikacijasdarbs.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table
@Data
@JsonIdentityInfo(scope = Submission.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "submissionId")
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(value = AccessLevel.NONE)
    @Column(name = "submissionId")
    private Long submissionId;
    @Column
    private String description;
    @Column
    private double latitude;
    @Column
    private double longitude;
    @Column(columnDefinition = "longblob")
    private byte[] picture;
    @Column
    private LocalDateTime submissionDate;
    @Column
    private Status status;
    @Column
    private Boolean isDeleted;
    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnoreProperties("submissions")
    private User user;

    @ManyToOne
    @JoinColumn(name = "officerId")
    private PoliceOfficer policeOfficer;

    public Submission(String description, double latitude, double longitude, User user, byte[] picture,Status status, LocalDateTime submissionDate, Boolean isDeleted){
        this.user = user;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.picture = picture;
        this.status = status;
        this.submissionDate = submissionDate;
        this.isDeleted = isDeleted;
    }

    public Submission() {

    }

}
