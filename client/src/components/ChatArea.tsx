import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import MessagesArea from "./MessagesArea";
import { useChatContext } from "../context/chatContext";

function ChatArea(){
    const {msgsAreaRef} = useChatContext()
    return <>
        <div className="chat-area" ref={msgsAreaRef}>
            <ChatHeader/>
            <MessagesArea/>
            <ChatForm />
         </div>
    </>
}

export default ChatArea;