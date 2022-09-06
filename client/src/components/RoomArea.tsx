import { Box } from "@mui/material"
import Room from "./Room"
import AddChatDialog from "./AddChatDialog"
import SearchForm from "./SearchForm"
import { useChatContext } from "../context/chatContext"

function RoomArea() {
    const {rooms,setRooms,addRoom} = useChatContext()
    return <>
    <Box component="div" className="room-area">
        <SearchForm {...{rooms,setRooms}}/>
        {rooms && rooms.map(room =>{
            return (room.search===undefined||room.search) && <Room key={room._id} room={room}/>
        })}
        <AddChatDialog add={addRoom}/>
    </Box>
    </>
}

export default RoomArea;