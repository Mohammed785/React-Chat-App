import { Schema, model } from "mongoose";
import { IMessage } from "../@types/message";

const MessageSchema = new Schema<IMessage>(
    {
        from: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Message can't be anonymous"],
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: "Room",
        },
        body: {
            type: String,
        },
        image: {
            type: String,
        }
    },
    { timestamps: true }
);

export default model<IMessage>("Message", MessageSchema);
