import { Schema,model } from "mongoose";
import { IRoom } from "../@types/room";

const RoomSchema = new Schema<IRoom>(
    {
        members: [
            {
                member: { type: Schema.Types.ObjectId, ref: "User" },
                privilege: {
                    type: String,
                    enum: ["Admin", "Member"],
                    default: "Member",
                },
            },
        ],
        name: {
            type: String,
        },
        avatar: {
            type: String,
            default:"default.jpg"
        },
        is_group:{
            type:Boolean,
            default:false
        }
    },
    { timestamps: true }
);

export default model<IRoom>("Room",RoomSchema)