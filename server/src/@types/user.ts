export interface IUser {
    username: string;
    password: string;
    avatar: string;
    last_seen: Date;
    comparePasswords: (password: string) => Promise<boolean>;
}