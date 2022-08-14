import { Types } from "mongoose";

export interface IMessage{
    from:Types.ObjectId,
    room:Types.ObjectId,
    body:string
}