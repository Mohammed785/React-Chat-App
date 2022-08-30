import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Mic from "@mui/icons-material/Mic"
import useRecorder from "../hooks/useRecorder"
import { Delete, Save } from "@mui/icons-material"
import StyledBadge from "./StyledBadge"
import axiosClient from "../axios"
import { useSocketContext } from "../context/socketContext"
import { IMessage } from "../@types/message"
import { useAuthContext } from "../context/authContext"
import { useChatContext } from "../context/chatContext"
import { useEffect, useState } from "react"

function SendVoiceMsg({add}:{add:(msg:IMessage)=>void}) {
    const { mediaState, setMediaState, startRecord, stopRecord } = useRecorder()
    const [cancel,setCancel] = useState(false)
    const {socket} = useSocketContext()
    const {user} = useAuthContext()!
    const {selectedRoom} = useChatContext()
    const cancelRecord = () => {
        stopRecord()
        setCancel(true)
    }
    useEffect(()=>{
        if(mediaState.data){
            if(cancel){
                setMediaState({...mediaState,data:null})
                setCancel(false)
            }else{
                handleSendRecord()
            }
        }
    },[mediaState.data])
    const handleSendRecord = async()=>{
        const data = new FormData()
        data.set("audio",mediaState.data!)        
        try {
            const {data:{message}} = await axiosClient.post(`message/audio/create?id=${selectedRoom?._id}`,data)
            console.log(message);            
            add({...message,audio:URL.createObjectURL(mediaState.data!),uploaded:true,from:{...user}})
            socket?.emit("privateMsg",{...message,from:user},selectedRoom?._id);
        } catch (error) {
            console.error(error);
        }
    }
    return <>
        <div className="controls-container">
            {mediaState.init && <>
                <Tooltip title="Recording">
                    <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot" sx={{ marginX: "10px" }} type="online" />
                </Tooltip>
                <Tooltip title="Save Record">
                    <IconButton onClick={stopRecord}>
                        <Save />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Cancel Record">
                    <IconButton onClick={cancelRecord}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </>
            }

        </div>
        {!mediaState.init && <Tooltip title="Voice msg">
            <IconButton onClick={startRecord}>
                <Mic />
            </IconButton>
        </Tooltip>
        }
    </>
}

export default SendVoiceMsg