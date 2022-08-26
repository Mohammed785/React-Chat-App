import { FormEvent, useState } from "react"
import { InputBase, IconButton, InputAdornment, Tooltip } from "@mui/material"
import Photo from "@mui/icons-material/Photo"
import Mic from "@mui/icons-material/Mic"
import EmojiEmotions from "@mui/icons-material/EmojiEmotions"
import ThumbUp from "@mui/icons-material/ThumbUp"
import Send from "@mui/icons-material/Send"
import axiosClient from "../axios"
import { useChatContext } from "../context/chatContext"
import { useAuthContext } from "../context/authContext"
import { useSocketContext } from "../context/socketContext"

function ChatForm(){
   const [msg,setMsg] = useState("")
   const {selectedRoom,addMsg} = useChatContext()
   const {user} = useAuthContext()!
   const {socket} = useSocketContext()
   const handleSendMsg = async(e:FormEvent)=>{
      e.preventDefault()
      try {
         const {data:{message}} = await axiosClient.post(`message/create?id=${selectedRoom&&selectedRoom._id}`,{body:msg})
         setMsg("")
         addMsg({...message,from:{...user}})
         socket?.emit("privateMsg",{...message,from:{...user}},selectedRoom?._id)
      } catch (error) {
         console.error(error);         
      }
   }
    return <>
    <div className="chat-area-footer">      
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
      <form method="POST" onSubmit={handleSendMsg} className="msg-inp">
         <InputBase value={msg} onChange={(e)=>{setMsg(e.target.value)}} required fullWidth placeholder="Type something here..." endAdornment={<InputAdornment position="end">
            <Tooltip title="Send"><IconButton type="submit"  aria-label="Send message" edge="end"><Send/></IconButton></Tooltip>
         </InputAdornment>}/>
      </form>
      
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