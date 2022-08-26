import { Box } from "@mui/material"
import Room from "./Room"
import AddChatDialog from "./AddChatDialog"
import { useEffect, useState } from "react"
import { IRoom } from "../@types/room"
import SearchForm from "./SearchForm"
import axiosClient from "../axios"

function RoomArea() {
    const [rooms,setRooms] = useState<IRoom[]>([])
    const addRoom = (room:IRoom)=>{
        setRooms([...rooms, room])
    }
    const getRooms = async()=>{
        try{    
            const {data:{rooms}} = await axiosClient.get("/room/rooms")
            setRooms(rooms)
        }catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{
        getRooms()
    },[])
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