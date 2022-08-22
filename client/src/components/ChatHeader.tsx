import { useEffect, useState } from "react"
import { useAuthContext } from "../context/authContext"
import { useChatContext } from "../context/chatContext"

function ChatHeader(){
    const {selectedRoom} = useChatContext()
    const {user} = useAuthContext()!
    const [roomInfo,setRoomInfo] = useState({name:"",avatar:""})
    const getRoomInfo = ()=>{
        if(selectedRoom?.is_group){
            setRoomInfo({name:selectedRoom.name,avatar:selectedRoom.avatar})
        } 
        else{
            for (const member of selectedRoom!.members) {
                if(member.member._id!==user?._id){
                    setRoomInfo({name:member.member.username,avatar:member.member.avatar})
                }
            }
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