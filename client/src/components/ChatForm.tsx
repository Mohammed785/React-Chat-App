import { useEffect, useState } from "react"
import { InputBase, IconButton, InputAdornment, Tooltip } from "@mui/material"
import Videocam from "@mui/icons-material/Videocam"
import Photo from "@mui/icons-material/Photo"
import Mic from "@mui/icons-material/Mic"
import Call from "@mui/icons-material/Call"
import EmojiEmotions from "@mui/icons-material/EmojiEmotions"
import ThumbUp from "@mui/icons-material/ThumbUp"
import Send from "@mui/icons-material/Send"
import axiosClient from "../axios"
import { useChatContext } from "../context/chatContext"
import { IMessage } from "../@types/message"
import { useAuthContext } from "../context/authContext"
import { useSocketContext } from "../context/socketContext"

function ChatForm({addMsg}:{addMsg:(msg:IMessage)=>void}){
   const [msg,setMsg] = useState("")
   const {selectedRoom} = useChatContext()
   const {user} = useAuthContext()!
   const {socket} = useSocketContext()
   const handleSendMsg = async()=>{
      try {
         if(msg){
            const {data:{message}} = await axiosClient.post(`message/create?id=${selectedRoom&&selectedRoom._id}`,{body:msg})
            setMsg("")
            addMsg({...message,from:{...user}})
            socket?.emit("privateMsg",{...message,from:{...user}},selectedRoom?._id)
         }
      } catch (error) {
         console.error(error);         
      }
   }
   useEffect(()=>{
      const enterToSend = async(e:KeyboardEvent)=>{
         if(e.key==="Enter"){
            await handleSendMsg()
         }
      }
      window.addEventListener("keydown",enterToSend)
      return ()=>window.removeEventListener("keydown",enterToSend)
   })
    return <>
    <div className="chat-area-footer">
      <Tooltip title="Video chat">
         <IconButton>
            <Videocam/>
         </IconButton>
      </Tooltip>
      
      <Tooltip title="Voice call">
      <IconButton>
         <Call/>
      </IconButton>
      </Tooltip>
      
      <Tooltip title="Send image">
      <IconButton>
         <Photo/>
      </IconButton>
      </Tooltip>
      
      <Tooltip title="Voice msg">
      <IconButton>
         <Mic/>
      </IconButton>
      </Tooltip>
      <InputBase value={msg} onChange={(e)=>{setMsg(e.target.value)}} className="msg-inp" placeholder="Type something here..." endAdornment={<InputAdornment position="end">
         <Tooltip title="Send"><IconButton onClick={handleSendMsg} aria-label="Send message" edge="end"><Send/></IconButton></Tooltip>
      </InputAdornment>}/>
      
      <Tooltip title="Emojis">
         <IconButton>
            <EmojiEmotions/>
         </IconButton>
      </Tooltip>

      <Tooltip title="Like">
         <IconButton>
            <ThumbUp/>
         </IconButton>
      </Tooltip>
   </div>
    </>
}

export default ChatForm