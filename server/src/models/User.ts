import { Schema, model } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";
import { IUser } from "../@types/user";

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, "Please provide username"],
            maxlength: 25,
            minlength: 2,
            unique: true,
            text:true
        },
        password: {
            type: String,
            required: [true, "Please provide password"]
        },
        avatar: {
            type: String,
            default: "default.jpg",
        },
        last_seen:{
            type:Date,
            required:false
        }
    },
    { timestamps: true }
);
UserSchema.set("toJSON",{transform(doc, ret, options) {
    delete ret.password
    return ret
},})

UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        const salt = await genSalt(12);
        this.password = await hash(this.password, salt);
    }
});

UserSchema.methods.comparePasswords = async function (plain: string) {
    return await compare(plain, this.password);
};

export default model<IUser>("User", UserSchema);
