import { useEffect, useState } from "react";
import { IMessage } from "../@types/message";
import axiosClient from "../axios";
import { useChatContext } from "../context/chatContext";
import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import MessagesArea from "./MessagesArea";

function ChatArea(){
   const {selectedRoom} = useChatContext()   
   const [msgs,setMsgs] = useState<IMessage[]>([])
   const getChatMsgs = async()=>{
      try {
         const {data:messages} = await axiosClient.get(`message/room?id=${selectedRoom!._id}`)
         setMsgs(messages.messages)
      } catch (error) {
         console.error(error);         
      }
   }
   useEffect(()=>{
      selectedRoom && getChatMsgs()
   },[selectedRoom])
    return <>
        <div className="chat-area">
            {selectedRoom&&<>
            <ChatHeader {...{roomName:selectedRoom.name}}/>
            <div className="chat-area-main">
               <MessagesArea msgs={msgs}/>
            </div>
            <ChatForm/>
            </>}
         </div>
    </>
}

export default ChatArea;