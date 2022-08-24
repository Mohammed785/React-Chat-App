import { useEffect } from "react"
import { IMessage } from "../@types/message"
import { useSocketContext } from "../context/socketContext"
import ChatMessage from "./ChatMsg"

function MessagesArea({ msgs,addMsg }: { msgs: IMessage[],addMsg:(msg:IMessage)=>void }) {
    const {socket} = useSocketContext()
    useEffect(()=>{
        function add(msg:IMessage,room:string){
            addMsg(msg)
        }
        socket?.on("msg",add)
        return ()=>{socket?.off("msg",add)}
    },[])
    return <>
    {msgs.map((msg)=>{
        return <ChatMessage key={msg._id} msg={msg}/>
    })}
    </>
}

export default MessagesArea