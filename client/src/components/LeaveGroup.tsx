import {Button,Dialog,DialogActions,Typography,DialogContent,DialogTitle} from "@mui/material";
import { useChatContext } from "../context/chatContext";
import { useState } from "react";
import axiosClient from "../axios";

function LeaveGroup(){
    const {selectedRoom} = useChatContext()
    const [leaveOpen,setLeaveOpen] = useState(false)
    const handleLeave = async()=>{
        try {
            const data = await axiosClient.delete(`room/${selectedRoom?._id}/leave`)
            setLeaveOpen(false)
        } catch (error) {
            console.error(error);            
        }
    }
    return <>
    <Button variant="contained" onClick={()=>{setLeaveOpen(true)}} color="error" fullWidth className="" sx={{marginTop:"10px"}} >
        Leave Room
    </Button>
    <Dialog onClose={()=>{setLeaveOpen(false)}} open={leaveOpen}>
        <DialogTitle>
            Leave Room Confirmation
        </DialogTitle>
        <DialogContent>
            <Typography>
                You are going to leave this room
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>{setLeaveOpen(false)}}>
                Close
            </Button>
            <Button variant="contained" onClick={()=>{handleLeave()}}>
                Confirm
            </Button>
        </DialogActions>
    </Dialog>
    </>
}

export default LeaveGroup;