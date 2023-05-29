import {Submission} from "./Submission";

export interface PoliceOfficer {
    officerId: number;
    name: string;
    surname: string;
    password: string;
    phoneNr: string;
    email: string;
    submission: Submission;
}