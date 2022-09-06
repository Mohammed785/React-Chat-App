import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Picker from "emoji-picker-react"
import EmojiEmotions from "@mui/icons-material/EmojiEmotions"
import { useState } from "react"

function EmojiPicker({addEmoji}:{addEmoji:(emoji:string)=>void}){
    const [showPicker,setShowPicker] = useState(false)
    return <>
    {showPicker &&<Picker onEmojiClick={(e,emoji)=>{addEmoji(emoji.emoji)}} pickerStyle={{position:"absolute",right:"0",bottom:"90%"}} searchPlaceholder="Search Emoji..." />}
    <Tooltip title="Emojis">
         <IconButton onClick={()=>{setShowPicker(!showPicker)}} > 
            <EmojiEmotions/>
         </IconButton>
      </Tooltip>
    </>
}


export default EmojiPicker