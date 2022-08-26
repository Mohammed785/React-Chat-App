import { IUser } from "./user"

export interface IMember {
    member: IUser;
    privilege: "Admin" | "Member";
}

export interface IRoom {
    _id: string;
    name: string;
    avatar: string;
    members: IMember[];
    is_group: boolean;
    search:boolean // this attribute help me to search the rooms
}