import {User} from "./User";

export interface Submission {
    submissionId: number;
    description: string | null;
    latitude: number;
    longitude: number;
    picture: ArrayBuffer | null;
    submissionDate: string;
    status: string | null;
    isDeleted?:Boolean | null;
    user: User | null;
}
