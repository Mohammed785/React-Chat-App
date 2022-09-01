import { IMessageUser } from "./message"

export interface ServerToClientEvents {
    IsConnected:(status:"online"|"offline"|"idle",userId:string)=>void
    msg:(msg:IMessageUser,room:string)=>void
}

export interface ClientToServerEvents {
    connected:(userId:string)=>void
    isConnected:(userId:string)=>void
    setStatus:(status:"idle"|"online")=>void
    privateMsg:(msg:IMessageUser,room:string)=>void
    joinRoom:(rooms:string|string[])=>void
    leaveRoom:(room:string)=>void
    globalMsg:(msg:IMessageUser)=>void
}