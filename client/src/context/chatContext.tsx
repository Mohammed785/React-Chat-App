import { createContext, useContext, useState } from "react";
import { IRoom } from "../@types/room";

type AuthContextType = {
    selectedRoom:IRoom|null
    setSelectedRoom:(room:IRoom)=>void
}

const ChatContext = createContext<AuthContextType>({selectedRoom:null,setSelectedRoom(room) {}})

function ChatProvider({children}:{children:JSX.Element}){
    const [selectedRoom,setSelectedRoom] = useState<IRoom|null>(null)
    return <ChatContext.Provider value={{selectedRoom,setSelectedRoom}}>
        {children}
    </ChatContext.Provider>
}

const useChatContext = ()=>{
    return useContext(ChatContext)
}

export {ChatProvider,useChatContext}