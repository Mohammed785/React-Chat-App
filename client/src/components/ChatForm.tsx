import { FormEvent, useState } from "react"
import { InputBase, IconButton, InputAdornment, Tooltip } from "@mui/material"
import Mic from "@mui/icons-material/Mic"
import Send from "@mui/icons-material/Send"
import axiosClient from "../axios"
import { useChatContext } from "../context/chatContext"
import { useAuthContext } from "../context/authContext"
import { useSocketContext } from "../context/socketContext"
import EmojiPicker from "./EmojiPicker"
import SendImage from "./SendImage"

function ChatForm(){
   const [msg,setMsg] = useState("")
   const {selectedRoom,addMsg} = useChatContext()
   const {user} = useAuthContext()!
   const {socket} = useSocketContext()
   const handleSendMsg = async(e:FormEvent,image:File|null=null)=>{
      e.preventDefault()
      try {
         const formData = new FormData(e.currentTarget as HTMLFormElement)
         image&&formData.set("image",image)
         const {data:{message}} = await axiosClient.post(`message/create?id=${selectedRoom&&selectedRoom._id}`,formData)   
         setMsg("")
         addMsg({...message,image:image?URL.createObjectURL(image):null,uploadedImg:image?true:false,from:{...user}})
         socket?.emit("privateMsg",{...message,from:{...user}},selectedRoom?._id)
      } catch (error) {
         setMsg("")
         console.error(error);         
      }
   }
   const addEmoji = (emoji:string)=>{
      setMsg(msg+emoji)
   }
    return <>
    <div className="chat-area-footer">      
      <SendImage {...{msg,setMsg,handleSendMsg}}/>
      <Tooltip title="Voice msg">
      <IconButton>
         <Mic/>
      </IconButton>
      </Tooltip>
      <form method="POST" onSubmit={handleSendMsg} className="msg-inp">
         <InputBase value={msg} onChange={(e)=>{setMsg(e.target.value)}} name="body" id="body" required fullWidth placeholder="Type something here..." endAdornment={<InputAdornment position="end">
            <Tooltip title="Send"><IconButton type="submit"  aria-label="Send message" edge="end"><Send/></IconButton></Tooltip>
         </InputAdornment>}/>
      </form>
      <EmojiPicker {...{addEmoji}}/>
   </div>
    </>
}

export default ChatForm