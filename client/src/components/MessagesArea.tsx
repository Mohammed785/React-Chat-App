import { useEffect } from "react"
import { IMessage } from "../@types/message"
import { useChatContext } from "../context/chatContext"
import { useSocketContext } from "../context/socketContext"
import ChatMessage from "./ChatMsg"

function MessagesArea() {
    const {socket} = useSocketContext()
    const {msgs,addMsg} = useChatContext()
    useEffect(()=>{
        function add(msg:IMessage,room:string){
            addMsg(msg)
        }
        socket?.on("msg",add)
        return ()=>{socket?.off("msg",add)}
    },[])
    return <>
    <div className="chat-area-main">
        {msgs.map((msg)=>{
            return (msg.search===undefined||msg.search) &&<ChatMessage key={msg._id} msg={msg}/>
        })}
    </div>
    </>
}

export default MessagesArea