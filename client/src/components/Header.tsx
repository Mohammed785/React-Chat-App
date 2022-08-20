import {Box,Avatar} from "@mui/material"
import img from "../img.jpg"
import SearchForm from "./SearchForm"
import LogoutIcon from '@mui/icons-material/Logout';
import axiosClient from "../axios";
import {useNavigate} from "react-router-dom"

function Header() {
    const navigate = useNavigate()
    const handleLogout = async()=>{
        try {
            await axiosClient.post("/logout")
            navigate("/login")
        } catch (error) {
            console.error(error)
        }
    }
    return <>
        <Box component="div" className="header">
            <SearchForm/>
            <Box component="div" flexDirection="row" className="user-info">
                <LogoutIcon onClick={handleLogout} sx={{cursor:"pointer"}}/>
                <Avatar alt="avatar" src={img} sx={{ cursor: "pointer", marginLeft: "10px" }} />
            </Box>
        </Box>
    </>
}

export default Header