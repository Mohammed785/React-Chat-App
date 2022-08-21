import {Tooltip,Fade} from "@mui/material"
import { IMessage } from "../@types/message"
import { useAuthContext } from "../context/authContext"
import moment from "moment"

function ChatMessage({msg}:{msg:IMessage}){
    const {user} = useAuthContext()!
    return <>
    <div className={`chat-msg ${user?._id===msg.from._id}`}>
        <div className="chat-msg-profile">
            <Tooltip title={msg.from.username} TransitionComponent={Fade} TransitionProps={{timeout:500}}>
                <img className="chat-msg-img"
                src={`${process.env.REACT_APP_STATIC_PATH}${msg.from.avatar}`}
                alt="avatar" />
            </Tooltip>
            <div className="chat-msg-date">Message sent {moment(msg.createdAt).format("LT")}</div>
        </div>
        <div className="chat-msg-content">
            <div className="chat-msg-text">{msg.body}</div>
            
        </div>
    </div>
    </>
}

export default ChatMessage