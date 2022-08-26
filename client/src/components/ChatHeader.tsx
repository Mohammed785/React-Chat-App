import { useEffect, useState } from "react"
import { useChatContext } from "../context/chatContext"
import SearchInChat from "./SearchInChat"

function ChatHeader(){
    const {selectedRoom} = useChatContext()
    const [roomInfo,setRoomInfo] = useState({name:"",avatar:""})
    const getRoomInfo = ()=>{
        if(selectedRoom?.is_group){
            setRoomInfo({name:selectedRoom.name,avatar:selectedRoom.avatar})
        } 
        else{
            const f_idx = selectedRoom?.members[0].member?0:1
            setRoomInfo({name:selectedRoom?.members[f_idx].member.username!,avatar:selectedRoom?.members[f_idx].member.avatar!})
        }
    }
    useEffect(()=>{
        getRoomInfo()
    },[selectedRoom])
    return <>
    <div className="chat-area-header">
        <img className="chat-area-profile" src={process.env.REACT_APP_STATIC_PATH+roomInfo.avatar} alt={roomInfo.name+" avatar"} />
        <div className="chat-area-title">{roomInfo.name}</div>
    </div>
    </>
}

export default ChatHeader