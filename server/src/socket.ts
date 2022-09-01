import { Server, Socket } from "socket.io";
import Redis from "ioredis"
import {ServerToClientEvents,ClientToServerEvents} from "./@types/socket"
export const redisClient = new Redis()

class Connection{
    io: Server<ClientToServerEvents, ServerToClientEvents>;
    socket: Socket<ClientToServerEvents, ServerToClientEvents>;
    constructor(io: Server<ClientToServerEvents, ServerToClientEvents>,socket: Socket<ClientToServerEvents, ServerToClientEvents>){
        this.io = io
        this.socket = socket

        socket.on("connected",(userId)=>{
            socket.data.userId= userId
            redisClient.set(userId,JSON.stringify({socketId:socket.id,status:"online"}),(err,val)=>{
                if(err){
                    console.log(err)
                }else{
                }
            })
        })
        socket.on("isConnected",(userId)=>{
            redisClient.get(userId,(err,value)=>{
                if(err || !value){
                    socket.emit("IsConnected","offline",userId)
                }
                if(value){                  
                    socket.emit("IsConnected",JSON.parse(value).status,userId)
                }
            })
        })
        socket.on("joinRoom",(rooms)=>{
            socket.join(rooms)
        })
        socket.on("leaveRoom",(room)=>{
            socket.leave(room)
        })
        socket.on("privateMsg",(msg,room)=>{
            socket.to(room).emit("msg",msg,room)
        })
        socket.on("globalMsg",(msg)=>{
            socket.to("global").emit("msg",msg,"global")
        })
        socket.on("disconnect",()=>{
            redisClient.del(socket.data.userId,(err,value)=>{
                if(err){
                    console.log(err)
                }
                if(value){
                }
            })

        })
    }
}


export function setSocket(io:Server){
    io.on("connection",(socket)=>{
        new Connection(io,socket)
    })
}