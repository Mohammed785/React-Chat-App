import { Types } from "mongoose";
import { IUser } from "./user";

export interface IMessage{
    from:Types.ObjectId;
    room:Types.ObjectId;
    body:string
}

export interface IMessageUser{
    from:IUser;
    room:Types.ObjectId;
    body:string
}