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
                (selectedRoom&&selectedRoom.is_group)&&<Tooltip title={msg.from.username} TransitionComponent={Fade} TransitionProps={{timeout:500}}>
                <img className="chat-msg-img"
                src={`${process.env.REACT_APP_STATIC_PATH}${msg.from.avatar}`}
                alt="avatar" />
            </Tooltip>
            }
            <div className="chat-msg-date">{moment(msg.createdAt).format("LT")}</div>
        </div>
        <div className="chat-msg-content">
            <div className="chat-msg-text">{msg.body}</div>
            {/* <div className="chat-msg-text">
            <img
                src="https://media0.giphy.com/media/yYSSBtDgbbRzq/giphy.gif?cid=ecf05e47344fb5d835f832a976d1007c241548cc4eea4e7e&rid=giphy.gif" />
            </div> */}
        </div>
    </div>
    </>
}

export default ChatMessage