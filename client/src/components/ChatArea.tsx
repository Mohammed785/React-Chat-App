
import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import MessagesArea from "./MessagesArea";

function ChatArea(){
    return <>
        <div className="chat-area">
            <ChatHeader/>
            <MessagesArea/>
            <ChatForm />
         </div>
    </>
}

export default ChatArea;