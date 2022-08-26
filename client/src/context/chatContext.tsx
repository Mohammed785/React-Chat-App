import { createContext, useContext, useState,useEffect } from "react";
import { IMessage } from "../@types/message";
import { IRoom } from "../@types/room";
import axiosClient from "../axios";

type AuthContextType = {
    selectedRoom:IRoom|undefined
    msgs:IMessage[]
    setSelectedRoom:(room:IRoom)=>void
    setMsgs:(msgs:IMessage[])=>void
    addMsg:(msg:IMessage)=>void
}

const ChatContext = createContext<AuthContextType>({selectedRoom:undefined,msgs:[],
    setSelectedRoom(room) {},setMsgs(msgs) {},addMsg(msg) {}})

function ChatProvider({children}:{children:JSX.Element}){
    const [selectedRoom,setSelectedRoom] = useState<IRoom|undefined>(undefined)
    const [msgs,setMsgs] = useState<IMessage[]>([])
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
        selectedRoom && getChatMsgs()
     },[selectedRoom])
    return <ChatContext.Provider value={{selectedRoom,msgs,setSelectedRoom,setMsgs,addMsg}}>
        {children}
    </ChatContext.Provider>
}

const useChatContext = ()=>{
    return useContext(ChatContext)
}

export {ChatProvider,useChatContext}