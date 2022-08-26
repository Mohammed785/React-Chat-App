
import { useChatContext } from "../context/chatContext";
import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import MessagesArea from "./MessagesArea";

function ChatArea(){
   const { selectedRoom } = useChatContext()
    return <>
        <div className="chat-area">
            {selectedRoom&&<>
            <ChatHeader/>
            <MessagesArea/>
            <ChatForm />
            </>}
         </div>
    </>
}

export default ChatArea;