import {Box,Avatar, Tooltip, IconButton} from "@mui/material"
import img from "../img.jpg"
import LogoutIcon from '@mui/icons-material/Logout';
import axiosClient from "../axios";
import {useNavigate} from "react-router-dom"
import { useSocketContext } from "../context/socketContext";
import { useAuthContext } from "../context/authContext";

function Header() {
    const navigate = useNavigate()
    const {logoutUser} = useAuthContext()!
    const {socket} = useSocketContext()
    const handleLogout = async()=>{
        try {
            await axiosClient.post("/logout")
            socket?.disconnect()
            logoutUser()
            navigate("/login")
        } catch (error) {
            console.error(error)
        }
    }
    return <>
        <Box component="div" className="header">
            <Box component="div" flexDirection="row" className="user-info">
                <Tooltip title="logout">
                    <IconButton onClick={handleLogout}>
                        <LogoutIcon  sx={{color:"black"}}/>
                    </IconButton>
                </Tooltip>
                <Avatar alt="avatar" src={img} sx={{ cursor: "pointer", marginLeft: "10px" }} />
            </Box>
        </Box>
    </>
}

export default Header