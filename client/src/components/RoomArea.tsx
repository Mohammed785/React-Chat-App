import { Box } from "@mui/material"
import Room from "./Room"
import AddChatDialog from "./AddChatDialog"
import { useChatContext } from "../context/chatContext"

function RoomArea() {
    const {rooms,addRoom} = useChatContext()
    return <>
    <Box component="div" className="room-area">
        {rooms && rooms.map(room =>{
            return <Room key={room._id} room={room}/>
        })}
        <AddChatDialog add={addRoom}/>
    </Box>
    </>
}

export default RoomArea;