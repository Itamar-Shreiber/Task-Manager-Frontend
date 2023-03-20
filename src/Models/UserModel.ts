export interface UserModel {
    id: number;
    nickname: string;
    email: string;
    password: string;
}

export interface UserPayloadModel {
    nickname: string;
    email: string;
    password: string;
}
