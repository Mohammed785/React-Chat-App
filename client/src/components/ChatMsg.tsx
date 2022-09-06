import {Tooltip,Fade} from "@mui/material"
import { IMessage } from "../@types/message"
import { useAuthContext } from "../context/authContext"
import moment from "moment"
import { useChatContext } from "../context/chatContext"

function ChatMessage({msg}:{msg:IMessage}){
    const {user} = useAuthContext()!
    const {selectedRoom} = useChatContext()
    return <>
    <div className={`chat-msg ${user?._id===msg.from._id&&"owner"}`}>
        <div className="chat-msg-profile">
            {
                (selectedRoom&&selectedRoom.is_group&&user?._id!==msg.from._id)&&<Tooltip title={msg.from.username} TransitionComponent={Fade} TransitionProps={{timeout:500}}>
                <img className="chat-msg-img" 
                src={`${process.env.REACT_APP_STATIC_PATH}${msg.from.avatar}`}
                alt="avatar" />
            </Tooltip>
            }
            <div className="chat-msg-date">{moment(msg.createdAt).format("LT")}</div>
        </div>
        <div className="chat-msg-content">
            {msg.image && <div className="chat-msg-text">
            <img src={`${msg.uploaded?msg.image:"http://localhost:8000/messages/"+msg.image}`}/>
            </div>
            }
            {msg.audio&& <audio controls><source key={Date.now()} src={msg.uploaded?msg.audio:"http://localhost:8000/messages/"+msg.audio} type="audio/ogg"/></audio>}
            {msg.body&&<div className="chat-msg-text">{msg.body}</div>}
        </div>
    </div>
    </>
}

export default ChatMessage