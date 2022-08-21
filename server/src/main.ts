import {config} from "dotenv"
config()
import "express-async-errors"
import express from "express"
import { connect } from "mongoose"
import session from "express-session"
import setPassport from "./config/passport"
import passport from "passport"
import { authRouter } from "./routes/auth"
import connectRedis from "connect-redis"
import { createClient } from "redis"
import { messageRouter } from "./routes/message"
import { authMiddleware } from "./middleware/authMiddleware"
import { roomRouter } from "./routes/room"
import { userRouter } from "./routes/user"
import cors from "cors"
import { join } from "path"

let RedisStore = connectRedis(session)
let redisClient = createClient({legacyMode:true})


const app = express()
app.use(cors({credentials:true,origin:true}))
app.use("/static",express.static(join(__dirname,"..","public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
setPassport(passport)
app.use(session({
    store:new RedisStore({client:redisClient}),
    secret:process.env.SECRET_SESSION,
    resave:false,
    saveUninitialized:true,
    name:"sid",
    cookie:{secure:process.env.NODE_ENV==="production",httpOnly:true,maxAge:1000*60*60*48}   
}))
if(process.env.NODE_ENV==="production"){
    app.set("trust proxy",1)
}
app.use(passport.initialize())
app.use(passport.session())
app.use("/",authRouter)
app.use("/message",authMiddleware,messageRouter)
app.use("/room",authMiddleware,roomRouter)
app.use("/",authMiddleware,userRouter)
const start = async () => {
    try {
        await connect(process.env.MONGO_URI);
        redisClient.on("error", (err) => console.log("REDIS: ", err));
        await redisClient.connect();
        app.listen(8000, () => console.log("[SERVER] Started"));
    } catch (error) {
        console.error(error);
    }
};

start()