package com.example.kvalifikacijasdarbs.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table
@Data
public class PhoneCall {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(value = AccessLevel.NONE)
    private Long callId;
    @Column
    private String phoneNumber;
    @Column
    private LocalDateTime callingTime;

    @ManyToOne
    @JoinColumn(name ="userId")
    private User user;

    public PhoneCall(User user, String phoneNumber) {
        this.user = user;
        this.phoneNumber = phoneNumber;
        this.callingTime = LocalDateTime.now();
    }

    public PhoneCall() {
    }

}
