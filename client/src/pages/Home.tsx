import { Box, Divider } from "@mui/material"
import "../index.css"
import Header from "../components/Header";
import RoomArea from "../components/RoomArea";
import ChatArea from "../components/ChatArea";


function Home(){
    return <>
    <Box component="div" className="app">
        <Header/>
        <Divider variant="middle" />
        <Box component="div" className="wrapper">
            <RoomArea/>
            <ChatArea/>
        </Box>
    </Box>
    </>
}

export default Home