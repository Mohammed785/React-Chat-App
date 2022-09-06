import { createContext, useContext, useState,useEffect, useRef, RefObject } from "react";
import { IMessage } from "../@types/message";
import { IRoom } from "../@types/room";
import { IUser } from "../@types/user";
import axiosClient from "../axios";

type AuthContextType = {
    rooms:IRoom[]
    selectedRoom:IRoom|undefined
    msgs:IMessage[]
    msgsAreaRef:RefObject<HTMLDivElement>|undefined
    setSelectedRoom:(room:IRoom)=>void
    setMsgs:(msgs:IMessage[])=>void
    addMsg:(msg:IMessage)=>void
    getFriendInfo:(room:IRoom)=>IUser
    setRooms:(rooms:IRoom[])=>void
    addRoom:(room:IRoom)=>void
    updateNotSeenMsgs:(roomId:string)=>void
}

const ChatContext = createContext<AuthContextType>({rooms:[],selectedRoom:undefined,msgs:[],msgsAreaRef:undefined,
    setRooms(rooms) {},addRoom(room) {},setSelectedRoom(room) {},setMsgs(msgs) {},
    addMsg(msg) {},getFriendInfo(room) {return room.members[0].member},updateNotSeenMsgs(roomId) {}})

function ChatProvider({children}:{children:JSX.Element}){
    const [selectedRoom,setSelectedRoom] = useState<IRoom|undefined>(undefined)
    const [msgs,setMsgs] = useState<IMessage[]>([])
    const msgsAreaRef = useRef<HTMLDivElement>(null)
    const [rooms,setRooms] = useState<IRoom[]>([])
    const addRoom = (room:IRoom)=>{
        setRooms([...rooms, room])
    }
    const getRooms = async()=>{
        try{    
            const {data:{rooms}} = await axiosClient.get("/room/rooms")
            setRooms(rooms)
        }catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{
        getRooms()
    },[])
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
    const updateNotSeenMsgs = (roomId:string)=>{
        setRooms((prev)=>{
            return prev.map((room)=>{
                if(roomId===room._id){
                    return {...room,notSeen:room.notSeen?room.notSeen+1:1}
                }
                return room
            })
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
    return <ChatContext.Provider value={{rooms,selectedRoom,msgs,msgsAreaRef,setRooms,addRoom,setSelectedRoom,setMsgs,addMsg,getFriendInfo,updateNotSeenMsgs}}>
        {children}
    </ChatContext.Provider>
}

const useChatContext = ()=>{
    return useContext(ChatContext)
}

export {ChatProvider,useChatContext}