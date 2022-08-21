import { IMessage } from "../@types/message"
import ChatMessage from "./ChatMsg"

function MessagesArea({ msgs }: { msgs: IMessage[] }) {
    return <>
    {msgs.map((msg)=>{
        return <ChatMessage key={msg._id} msg={msg}/>
    })}
        
    </>
}

export default MessagesArea