import { Types } from "mongoose"

interface IMember {
    member: Types.ObjectId;
    privilege: String;
}

export interface IRoom {
    members: IMember[];
    name?: String;
    avatar?: String;
    is_group: boolean;
}