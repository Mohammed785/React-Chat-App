import { createContext, useContext, useState,useEffect, useRef, RefObject } from "react";
import { IMessage } from "../@types/message";
import { IRoom } from "../@types/room";
import { IUser } from "../@types/user";
import axiosClient from "../axios";

type AuthContextType = {
    selectedRoom:IRoom|undefined
    msgs:IMessage[]
    msgsAreaRef:RefObject<HTMLDivElement>|undefined
    setSelectedRoom:(room:IRoom)=>void
    setMsgs:(msgs:IMessage[])=>void
    addMsg:(msg:IMessage)=>void
    getFriendInfo:(room:IRoom)=>IUser
}

const ChatContext = createContext<AuthContextType>({selectedRoom:undefined,msgs:[],msgsAreaRef:undefined,
    setSelectedRoom(room) {},setMsgs(msgs) {},addMsg(msg) {},getFriendInfo(room) {return room.members[0].member}})

function ChatProvider({children}:{children:JSX.Element}){
    const [selectedRoom,setSelectedRoom] = useState<IRoom|undefined>(undefined)
    const [msgs,setMsgs] = useState<IMessage[]>([])
    const msgsAreaRef = useRef<HTMLDivElement>(null)
    const getChatMsgs = async()=>{
        try {
           const {data:messages} = await axiosClient.get(`message/room?id=${selectedRoom!._id}`)
           setMsgs(messages.messages)
        } catch (error) {
           console.error(error);         
        }
    }
    const addMsg = (msg:IMessage)=>{
        setMsgs((prev)=>{
           return [...prev,msg]
        })
    }
    useEffect(()=>{
        if(msgsAreaRef.current){
            msgsAreaRef.current.scrollTo({top:msgsAreaRef.current.scrollHeight,behavior:"smooth"});
        }
    },[msgs])
    const getFriendInfo = (room:IRoom)=>{
        return room.members[0].member?room.members[0].member:room.members[1].member
    }
    useEffect(()=>{
        selectedRoom && getChatMsgs()
     },[selectedRoom])
    return <ChatContext.Provider value={{selectedRoom,msgs,msgsAreaRef,setSelectedRoom,setMsgs,addMsg,getFriendInfo}}>
        {children}
    </ChatContext.Provider>
}

const useChatContext = ()=>{
    return useContext(ChatContext)
}

export {ChatProvider,useChatContext}