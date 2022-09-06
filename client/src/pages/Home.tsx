import { Box, Divider } from "@mui/material"
import "../index.css"
import Header from "../components/Header";
import RoomArea from "../components/RoomArea";
import ChatArea from "../components/ChatArea";
import DetailsArea from "../components/DetailsArea";
import { useChatContext } from "../context/chatContext";


function Home(){
    const {selectedRoom} = useChatContext()
    return <>
    <Box component="div" className="app">
        <Header/>
        <Divider variant="middle" />
        <Box component="div" className="wrapper">
            <RoomArea/>
            {selectedRoom&&<>
            <ChatArea/>
            <DetailsArea/>
            </>}
        </Box>
    </Box>
    </>
}

export default Home