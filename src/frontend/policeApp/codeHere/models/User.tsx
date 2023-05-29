import {Submission} from "./Submission";

export interface User {
    userId: number | null;
    name: string | null;
    surname: string | null;
    password?: string | null;
    phoneNr: string | null;
    email: string | null;
    role?: string | null;
    submissions?: Submission[] | null;
    questions?: any[] | null;
}