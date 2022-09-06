import {Button} from "@mui/material";
import { useChatContext } from "../context/chatContext";
import Call from "@mui/icons-material/Call"
import LeaveGroup from "./LeaveGroup";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import VideoCall from "./VideoCall";

function ChatDetails(){
    const {selectedRoom,getFriendInfo} = useChatContext()
    const [isAdmin,setIsAdmin] = useState(false)
    const {user} = useAuthContext()!
    useEffect(()=>{
        if(selectedRoom?.is_group){            
            for (const member of selectedRoom.members) {
                if(String(member.member)===user?._id && member.privilege==="Admin"){
                    setIsAdmin(true)
                    break
                }   
            }
        }else{
            setIsAdmin(false)
        }
    },[selectedRoom])
    return <>
        <div className="detail-area-header">
            <div className="msg-profile group">
            <img src={`${process.env.REACT_APP_STATIC_PATH+"avatars/"}${selectedRoom?.is_group?selectedRoom?.avatar:getFriendInfo(selectedRoom!).avatar}`} alt="avatar" />
            </div>
            <div className="detail-title">{selectedRoom?.name}</div>
            <div className="detail-buttons">
                {
                    !selectedRoom?.is_group&&<>
                    <Button variant="contained" className="detail-button" startIcon={<Call/>} >
                        Audio
                    </Button>
                    <VideoCall userId={getFriendInfo(selectedRoom!)._id}/>
                    </>
                }
            </div>
            {
                isAdmin&&<Button variant="contained" onClick={()=>{navigator.clipboard.writeText(selectedRoom!._id)}} color="success" fullWidth className="" sx={{marginTop:"10px"}} >
                    Copy Invitation Code
                </Button>
            }
            {
                selectedRoom?.is_group&&<LeaveGroup/>    
            }

        </div>
    </>
}

export default ChatDetails