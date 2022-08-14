export interface IUser {
    username: string;
    password: string;
    avatar: string;
    comparePasswords:(password:string)=>Promise<boolean>;
}