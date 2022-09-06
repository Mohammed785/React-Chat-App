import { useState,useEffect } from "react";
import { Box, Typography, Avatar, Badge } from "@mui/material"
import { IRoom } from "../@types/room"
import moment from "moment"
import { IUser } from "../@types/user";
import { useChatContext } from "../context/chatContext";
import { useSocketContext } from "../context/socketContext";
import StyledBadge from "./StyledBadge";

function Room({ room }: { room: IRoom }){
    const [friend, setFriend] = useState<IUser | undefined>(undefined)
    const [friendStatus,setFriendStatus] = useState("idle")
    const {selectedRoom,setSelectedRoom} = useChatContext()
    const {socket} = useSocketContext()
    const getFriendInfo = ()=>{
        room.members[0].member?setFriend(room.members[0].member):setFriend(room.members[1].member)
    }
    const selectRoom = ()=>{
        setSelectedRoom(room)
    }
    useEffect(()=>{
        if(!room.is_group){
            getFriendInfo()
        }
        socket?.emit("joinRoom",room._id)
    },[])
    useEffect(()=>{
        function setConnection(status:string,userId:string){
            if(userId===friend?._id){
                setFriendStatus(status)
            }
        }
        if(friend && !room.is_group){          
            socket?.emit("isConnected",friend._id)
            socket?.on("IsConnected",setConnection)
            return ()=>{socket?.off("IsConnected",setConnection)}
        }
    },[friend,selectRoom])
    return <>
        <Box component="div" onClick={()=>{selectRoom()}} className={`msg ${(selectedRoom&&room._id===selectedRoom._id)&&"active"}`}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                type={friendStatus}
                >
                <Avatar alt="avatar" src={`${process.env.REACT_APP_STATIC_PATH}avatars/${room.is_group?room.avatar:friend?.avatar}`} />
            </StyledBadge>
            <Box component="div" className="msg-detail">
                <Box component="div" className="msg-username">
                    {(room.is_group)?room.name:friend?.username}
                </Box>
                <Box component="div" className="msg-content">
                    {(friend&&friendStatus==="offline") && <Typography variant="body1" className="msg-date">{moment(friend?.last_seen).fromNow()}</Typography>}
                </Box>
            </Box>
            <Badge className="notSeen" badgeContent={room?.notSeen&&room.notSeen} max={999} color="primary">
            </Badge>
        </Box>
    </>
}

export default Room;