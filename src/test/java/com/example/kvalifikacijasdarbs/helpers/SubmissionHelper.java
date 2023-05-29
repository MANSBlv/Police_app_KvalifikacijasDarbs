package com.example.kvalifikacijasdarbs.helpers;

import com.example.kvalifikacijasdarbs.models.Submission;

public class SubmissionHelper {

    private SubmissionHelper() {

    }

    public static Submission createSubmission() {
        Submission submission = new Submission();

        submission.setDescription("Test Description");
        submission.setLongitude(57.777);
        submission.setLatitude(58.888);

        return submission;
    }
}
