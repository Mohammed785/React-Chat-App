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
import { messageRouter } from "./routes/message"
import { authMiddleware } from "./middleware/authMiddleware"
import { roomRouter } from "./routes/room"
import { userRouter } from "./routes/user"
import cors from "cors"
import {createServer} from "http"
import {Server} from "socket.io"
import { join } from "path"
import {redisClient,setSocket} from "./socket"
import ErrorHandler from "./middleware/errorHandler"
import { ExpressPeerServer } from "peer"

let RedisStore = connectRedis(session)

const app = express()
const peerApp = express()
const server = createServer(app)
const peerServer = createServer(peerApp)
const io = new Server(server,{cors:{origin:true}})
const expressPeerServer = ExpressPeerServer(peerServer,{
    path:"/"
})
app.use(cors({credentials:true,origin:true}))
peerApp.use("/peer",expressPeerServer)
app.use("/static",express.static(join(__dirname,"..","public")))
app.use("/avatars",express.static(join(__dirname,"..","public","avatars")))
app.use("/messages",express.static(join(__dirname,"..","public","messages")))
app.use("/download",async(req,res)=>{
    if(!req.query.file){
        return res.status(400).json({msg:"No file name provided"})
    }
    const file = join(__dirname,"..","public","messages",req.query.file as string)
    return res.download(file)
})
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
app.use("/user",authMiddleware,userRouter)
app.use(ErrorHandler)
const start = async () => {
    try {
        await connect(process.env.MONGO_URI);
        redisClient.on("error", (err) => console.log("REDIS: ", err));
        setSocket(io)
        server.listen(8000, () => console.log("[SERVER] Started"));
        peerServer.listen(9000,()=>console.log("[PEER] started"))
    } catch (error) {
        console.error(error);
    }
};

start()