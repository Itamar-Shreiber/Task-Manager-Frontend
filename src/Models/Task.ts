import { UserModel } from "./UserModel";

export interface TaskModel {
    id: number;
    title: string;
    description: string;
    group: string;
    when: Date;
    status: string;
    user: UserModel;
}

export interface TaskPayloadModel {
    title: string;
    description: string;
    group: string;
    when: Date;
    status: string;
    user:UserModel;
}
