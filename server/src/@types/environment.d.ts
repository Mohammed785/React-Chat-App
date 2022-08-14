import { Types } from "mongoose";
import { IUser } from "./user";

declare global{
    namespace NodeJS{
        interface ProcessEnv {
            MONGO_URI: string;
            SECRET_SESSION: string;
            NODE_ENV: string;
        }
    }
    namespace Express{
        interface User extends IUser{
            _id:Types.ObjectId
        }
    }
}

export {}