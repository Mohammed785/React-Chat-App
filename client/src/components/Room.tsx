import { useState,useEffect } from "react";
import { Box, Typography, Avatar, Badge } from "@mui/material"
import { styled } from '@mui/material/styles';
import { IRoom } from "../@types/room"
import { useAuthContext } from "../context/authContext";
import moment from "moment"
import { IUser } from "../@types/user";

const StyledBadge = styled(Badge, { shouldForwardProp: (prop) => prop !== "type" })<{ type: string }>(({ theme, type }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: type === "online" ? '#44b700' : type === "offline" ? "#be2323" : "#808080",
        color: type === "online" ? '#44b700' : type === "offline" ? "#be2323" : "#808080",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

function Room({ room }: { room: IRoom }){
    const [friend, setFriend] = useState<IUser | undefined>(undefined)
    const {user} = useAuthContext()!
    const getFriendInfo = ()=>{
        const friend = room.members.filter(member=>{
            return member.member._id!==user!._id
        })
        setFriend(friend[0].member)
    }
    useEffect(()=>{
        if(!room.is_group){
            getFriendInfo()
        }
    },[])
    return <>
        <Box component="div" className="msg">
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                type="online"
            >
                <Avatar alt="avatar" src={`http://localhost:8000/static/${room.is_group?room.avatar:friend?.avatar}`} />
            </StyledBadge>
            <Box component="div" className="msg-detail">
                <Box component="div" className="msg-username">
                    {(room.is_group)?room.name:friend?.username}
                </Box>
                <Box component="div" className="msg-content">
                    {/* <Typography variant="body1" className="msg-message">
                        last message
                    </Typography> */}
                    {friend && <Typography variant="body1" className="msg-date">{moment(friend?.last_seen).fromNow()}</Typography>}
                </Box>
            </Box>
        </Box>
    </>
}

export default Room;