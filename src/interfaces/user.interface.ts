import { ITender } from "./tender.interface";

export interface IUser {
    id: number;
    username: string;
    fullName: string;
    email: string;
    role: string;
    archivedTenders: ITender[];
    recordedTenders: ITender[];
} 